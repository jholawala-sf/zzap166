/*
 * QLabsDataStore API
 *
 * QLabsDataStore is a custom object type for storing/querying arbitrary data
 * in a RESTful manner. It is used to store data for this BM extension.
 *
 * This custom object allows for creating new sub-types on the fly just by
 * using them in a restful manner. It also allows for persisting and querying
 * by arbitrary key=value pairs using the c_attrs field. Giving a basic ability for
 * indexed queries (and potential for range queries in the future)
 *
 * This allows for high agility in developing this BM extension as new custom objects
 * and/or fields do NOT need to be created for every use case and data is all localized
 * under 1 custom object type.
 *
 * This module uses the DATAAPI custom_objects resources and translates the results
 * into a form as if it were a unique REST API per subtype. OCAPI resource state
 * is used for PUT/PATCH requests to ensure a level of optimistic locking appropriate
 * for business manager applications.
 *
 * TODO
 *   - range filter on date fields
 *   - is a text query possible over c_attrs? need to see if it supports the same wild cards as script API search. If so
 *     bool query a text query ${key}=* and text query ${value}
 */

import type { UseQueryOptions } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { uuid4 } from "../utils";
import { api as ocapi } from "./ocapi";

declare module "@tanstack/react-query" {
    interface Register {
        defaultError: AxiosError;
    }
}

export const CUSTOM_OBJ_TYPE = "QLabsDataStore";
const PRETTY_STRINGIFY = true;

// the raw object from the custom type
interface QLabsDataStoreObject {
    _type: string;
    _resource_state: string;
    creation_date: string;
    key_property: string;
    key_value_string: string;
    last_modified: string;
    object_type: string;
    c_attrs: string[];
    c_data: string;
    c_typeId: string;
}

interface CustomObjectSearchResponse {
    hits: QLabsDataStoreObject[];
    start: number;
    total: number;
    count: number;
}

// Referenceable objects have the id and type of the containing
// DataStoreObject so the data store object can be reconstructed
export type Referenceable<T> = T & {
    __id: string;
    __typeId: string;
};

export interface DataStoreObject<T> {
    id: string;
    typeId: string;
    creationDate: string;
    lastModified: string;
    resourceState: string;
    attrs: QueryableAttributes;

    data: Referenceable<T>;
}

interface DataStoreSearchResult<T> {
    count: number;
    start: number;
    total: number;
    data: DataStoreObject<T>[];
}

interface QueryableAttributes {
    [key: string]: string | boolean;
}

export enum SortOrder {
    ASC = "asc",
    DESC = "desc",
}

interface Sort {
    field: string;
    sortOrder?: SortOrder;
}

interface SearchOptions {
    attrs?: QueryableAttributes;
    attributeOperator?: "AND" | "OR";
    start?: number;
    count?: number;
    sort?: Sort[];
}

function customObjToDataStoreObject<T>(
    obj: QLabsDataStoreObject,
): DataStoreObject<T> {
    return {
        typeId: obj.c_typeId,
        creationDate: obj.creation_date,
        lastModified: obj.last_modified,
        resourceState: obj._resource_state,
        attrs:
            obj.c_attrs?.reduce((attrs, attr) => {
                const [key, value] = attr.split("=");
                attrs[key] = value;
                return attrs;
            }, {}) ?? {},
        data: {
            __id: obj.key_value_string,
            __typeId: obj.c_typeId,
            ...JSON.parse(obj.c_data),
        },
        id: obj.key_value_string,
    };
}

const SYSTEM_FIELD_MAP = {
    creationDate: "creation_date",
    lastModified: "last_modified",
};
const SYSTEM_FIELDS = ["creation_date", "last_modified"];

/**
 * Get all objects of typeId or optionally filtered by attrs
 *
 * @param typeId
 * @param options
 */
export async function searchObjects<T>(
    typeId: string,
    {
        attrs = {},
        attributeOperator = "AND",
        start = 0,
        count = 100,
        sort = [],
    }: SearchOptions = {},
): Promise<DataStoreSearchResult<T>> {
    var queryRequirements: any = [
        {
            term_query: {
                fields: ["c_typeId"],
                operator: "is",
                values: [typeId],
            },
        },
    ];

    if (attrs) {
        const attrQueries = Object.entries(attrs).map(([key, value]) => ({
            term_query: {
                fields: ["c_attrs"],
                operator: "is",
                values: [`${key}=${value}`],
            },
        }));
        queryRequirements.push({
            bool_query: {
                [attributeOperator === "AND" ? "must" : "should"]: attrQueries,
            },
        });
    }

    var _sorts: Array<any>;
    if (sort.length > 0) {
        _sorts = sort.map((sort) => {
            const field = SYSTEM_FIELD_MAP[sort.field] || sort.field;
            return {
                field: SYSTEM_FIELDS.includes(field) ? field : `c_${field}`,
                sort_order: sort.sortOrder,
            };
        });
    }

    const response = await ocapi.post<
        any,
        AxiosResponse<CustomObjectSearchResponse>
    >(`custom_objects_search/${CUSTOM_OBJ_TYPE}`, {
        query: {
            bool_query: {
                must: queryRequirements,
            },
        },
        select: "(**)",
        start: start,
        count: count,
        sorts: _sorts,
    });

    return {
        count: response.data.count,
        start: response.data.start,
        total: response.data.total,
        data: response.data.hits?.map(customObjToDataStoreObject<T>) || [],
    };
}

/**
 * Get a single data store object by id; the type is ignored here as the ID must be unique
 * @param id
 */
export async function getObject<T>(id: string): Promise<DataStoreObject<T>> {
    // custom objects GET by id does not return data fields so we must use search (which does)
    const response = await ocapi.post<
        any,
        AxiosResponse<CustomObjectSearchResponse>
    >(`custom_objects_search/${CUSTOM_OBJ_TYPE}`, {
        query: {
            term_query: {
                fields: ["key_value_string"],
                operator: "is",
                values: [id],
            },
        },
        select: "(**)",
    });

    if (!response.data.hits || response.data.hits.length === 0) {
        throw new Error(`No object found for id ${id}`);
    }

    return customObjToDataStoreObject(response.data.hits[0]);
}

/**
 * Create a new data store object, generating a new id with optional queryable attrs
 * @param typeId
 * @param data
 * @param attrs
 */
export async function postObject<T>(
    typeId: string,
    data: T,
    attrs?: QueryableAttributes,
): Promise<DataStoreObject<T>> {
    var newId = uuid4().replace(/-/g, "");
    var serializedData = PRETTY_STRINGIFY
        ? JSON.stringify(data, null, 2)
        : JSON.stringify(data);
    const response = await ocapi.put(
        `custom_objects/${CUSTOM_OBJ_TYPE}/${newId}`,
        {
            _resource_state: "not_exists",
            c_typeId: typeId,
            c_data: serializedData,
            c_attrs: Object.entries(attrs || {}).map(
                ([key, value]) => `${key}=${value}`,
            ),
        },
    );
    return customObjToDataStoreObject(response.data);
}

/**
 * Update an existing object by id, queryable attrs are replaced
 *
 * @param obj
 * @param attrs
 */
export async function putObject<T>(
    obj: DataStoreObject<T>,
    attrs?: QueryableAttributes,
): Promise<DataStoreObject<T>> {
    var _data = Object.entries(obj.data).reduce((acc, [key, value]) => {
        if (key !== "__id" && key !== "__typeId") {
            acc[key] = value;
        }
        return acc;
    }, {});
    var serializedData = PRETTY_STRINGIFY
        ? JSON.stringify(_data, null, 2)
        : JSON.stringify(_data);
    const response = await ocapi.put(
        `custom_objects/${CUSTOM_OBJ_TYPE}/${obj.id}`,
        {
            _resource_state: obj.resourceState,
            c_typeId: obj.typeId,
            c_data: serializedData,
            c_attrs: Object.entries(attrs || {}).map(
                ([key, value]) => `${key}=${value}`,
            ),
        },
    );
    return customObjToDataStoreObject(response.data);
}

/**
 * Patch an existing object by id, data is shallow merged, queryable attrs are replaced
 *
 * @param obj
 * @param attrs
 */
export async function patchObject<T>(
    obj: DataStoreObject<Partial<T>>,
    attrs?: QueryableAttributes,
): Promise<DataStoreObject<T>> {
    const existing = await ocapi.get<QLabsDataStoreObject>(
        `custom_objects/${CUSTOM_OBJ_TYPE}/${obj.id}`,
    );
    const existingData = JSON.parse(existing.data.c_data);
    var serializedData: string;
    if (PRETTY_STRINGIFY) {
        serializedData = JSON.stringify(
            {
                ...existingData,
                ...obj.data,
            },
            null,
            2,
        );
    } else {
        serializedData = JSON.stringify({
            ...existingData,
            ...obj.data,
        });
    }
    const response = await ocapi.put(
        `custom_objects/${CUSTOM_OBJ_TYPE}/${obj.id}`,
        {
            _resource_state: obj.resourceState,
            c_typeId: obj.typeId,
            c_data: serializedData,
            c_attrs: Object.entries(attrs || {}).map(
                ([key, value]) => `${key}=${value}`,
            ),
        },
    );
    return customObjToDataStoreObject(response.data);
}

/**
 * Delete an existing object by id
 * @param obj
 */
export async function deleteObject<T>(obj: DataStoreObject<T>): Promise<void> {
    await ocapi.delete(`custom_objects/${CUSTOM_OBJ_TYPE}/${obj.id}`);
}

interface DataStoreHooksOptions<T> {
    typeId: string;
    queryableAttributes?: Array<keyof T>;
    defaultData: T;
}

export function createDataStoreHooks<T extends object>({
    typeId,
    queryableAttributes = [],
    defaultData,
}: DataStoreHooksOptions<T>) {
    // Helper function to convert data to queryable attributes
    const dataToQueryableAttributes = (data: T): QueryableAttributes => {
        return queryableAttributes.reduce<QueryableAttributes>((obj, key) => {
            const value = data[key];
            if (value !== undefined) {
                // Only include string or boolean values
                if (typeof value === "string" || typeof value === "boolean") {
                    obj[String(key)] = value;
                }
            }
            return obj;
        }, {});
    };

    // Query Keys and Query Objects
    const queries = {
        list: {
            queryKey: [typeId, "__list__"] as const,
            queryFn: async (): Promise<DataStoreObject<T>[]> => {
                return (await searchObjects<T>(typeId)).data;
            },
        },
        item: (id: string) => ({
            queryKey: [typeId, id] as const,
            queryFn: async (): Promise<DataStoreObject<T>> =>
                await getObject(id),
        }),
        find: (options: SearchOptions) => ({
            queryKey: [typeId, "__list__", options] as const,
            queryFn: async (): Promise<DataStoreObject<T>[]> =>
                (await searchObjects<T>(typeId, options)).data,
        }),
    };

    const mutations = {
        create: async (data: Partial<T>): Promise<void> => {
            await postObject(typeId, {
                ...defaultData,
                ...data,
            });
        },
        update: (item: DataStoreObject<T>) => {
            return (data: T): Promise<DataStoreObject<T>> => {
                const attrs = dataToQueryableAttributes(data);
                return putObject(
                    {
                        ...item,

                        data: {
                            ...data,
                            __id: item.id,
                            __typeId: typeId,
                        },
                    },
                    attrs,
                );
            };
        },
        patch: (item: DataStoreObject<T>) => {
            return async (data: Partial<T>): Promise<void> => {
                await putObject<T>({
                    ...item,
                    data: {
                        ...item.data,
                        ...data,
                    },
                });
            };
        },
        delete: async (item: DataStoreObject<T>): Promise<void> => {
            await deleteObject(item);
        },
    };

    // Hooks

    // need to be explicit with typing here as the queryOptions rest throws off implicit typing (even with Omit)
    // we also support overriding TData as derived hooks need to do that if they use "select"
    const useList = <TData = DataStoreObject<T>[]>(
        queryOptions?: Omit<
            UseQueryOptions<DataStoreObject<T>[], AxiosError, TData>,
            "queryKey" | "queryFn"
        >,
    ) => {
        return useQuery<DataStoreObject<T>[], AxiosError, TData>({
            ...queryOptions,
            queryKey: queries.list.queryKey,
            queryFn: queries.list.queryFn,
        });
    };

    const useItem = <TData = DataStoreObject<T>>(id: string) => {
        return useQuery<DataStoreObject<T>, AxiosError, TData>(
            queries.item(id),
        );
    };

    const useFind = <TData = DataStoreObject<T>[]>(
        options: SearchOptions,
        queryOptions?: Omit<
            UseQueryOptions<DataStoreObject<T>[], AxiosError, TData>,
            "queryKey" | "queryFn"
        >,
    ) => {
        return useQuery<DataStoreObject<T>[], AxiosError, TData>({
            ...queryOptions,
            ...queries.find(options),
        });
    };

    const useCreate = () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: mutations.create,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [typeId] });
            },
        });
    };

    const useUpdate = (item: DataStoreObject<T>) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: mutations.update(item),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [typeId] });
            },
        });
    };

    const usePatch = (item: DataStoreObject<T>) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: mutations.patch(item),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: queries.item(item.id).queryKey,
                });
            },
        });
    };

    const useDelete = () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: mutations.delete,
            onSuccess: async () => {
                queryClient.invalidateQueries({
                    queryKey: queries.list.queryKey,
                });
            },
        });
    };

    return {
        // Query Objects
        queries,
        // Mutation Objects
        mutations,
        // Hooks
        useList,
        useItem,
        useFind,
        useCreate,
        useUpdate,
        usePatch,
        useDelete,
    };
}

if (typeof window !== "undefined") {
    (window as any).qlabsDataStore = {
        searchObjects,
        getObject,
        postObject,
        putObject,
        patchObject,
        deleteObject,
    };
}
