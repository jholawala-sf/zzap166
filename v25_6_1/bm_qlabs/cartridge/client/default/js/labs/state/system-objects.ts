import { useQuery } from "@tanstack/react-query";
import { api as ocapi } from "../api/ocapi";
import type { ObjectAttribute } from "./types";
import { camelCaseToSnakeCase } from "../utils";

export function useSystemObjects() {
    return useQuery({
        queryKey: ["systemObjects"],
        queryFn: async (): Promise<string[]> => {
            return (
                await ocapi.get(
                    `system_object_definitions?select=(**)&count=100`,
                )
            ).data.data.map((obj) => obj.object_type);
        },
    });
}

/**
 * Returns only string, text, or HTML types
 * @param objectType
 */
export function attributesQuery(objectType: string) {
    return {
        queryKey: ["object", objectType, "attributes"],
        queryFn: async (): Promise<ObjectAttribute[]> => {
            return (
                await ocapi.post(
                    `system_object_definitions/${objectType}/attribute_definition_search`,
                    {
                        query: {
                            bool_query: {
                                must: [
                                    {
                                        term_query: {
                                            fields: ["system"],
                                            operator: "one_of",
                                            values: [true, false],
                                        },
                                    },
                                    {
                                        term_query: {
                                            fields: ["value_type"],
                                            operator: "one_of",
                                            values: ["string", "text", "html"],
                                        },
                                    },
                                ],
                            },
                        },
                        select: "(**)",
                        count: 200,
                        sorts: [{ field: "display_name", sort_order: "asc" }],
                    },
                )
            ).data.hits;
        },
        select: (data: ObjectAttribute[]) => {
            // enhance the result so we have an effective snake case id for the non custom attrs
            return data?.map((attribute) => {
                var ocapiId = attribute.effective_id;
                if (!attribute.effective_id.startsWith("c_")) {
                    ocapiId = camelCaseToSnakeCase(attribute.effective_id);
                }
                const _attribute = {
                    ...attribute,
                    ocapi_id: ocapiId,
                };

                return _attribute;
            });
        },
    };
}

export function useProductAttributes() {
    return useQuery(attributesQuery("Product"));
}

export function useProductAttribute(attributeId: string) {
    return useQuery({
        ...attributesQuery("Product"),
        select: (data: ObjectAttribute[]) => {
            return data?.find((attr) => attr.id === attributeId);
        },
    });
}
