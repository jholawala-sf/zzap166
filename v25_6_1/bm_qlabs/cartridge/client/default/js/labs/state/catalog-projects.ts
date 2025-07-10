import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import queryClient from "../query-client";
import type { DataStoreObject } from "../api/data";
import {
    deleteObject,
    getObject,
    postObject,
    putObject,
    searchObjects,
} from "../api/data";

export interface CatalogProject {
    name: string;
    columns: string[];
    products: string[];
    productChanges: Record<string, object[]>;
}

export const catalogProjectsQuery = () => ({
    queryKey: ["catalogProjects", "__list__"],
    queryFn: async (): Promise<DataStoreObject<CatalogProject>[]> => {
        return (await searchObjects<CatalogProject>("catalogProjects")).data;
    },
});

export const useCatalogProjects = () => {
    return useQuery(catalogProjectsQuery());
};

export const createCatalogProjectMutation = () => ({
    mutationFn: async (): Promise<void> => {
        await postObject("catalogProjects", {
            name: "New Catalog Project",
            columns: ["short_description"],
            products: [],
            productChanges: {},
        });
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["catalogProjects"] });
    },
});

export const deleteCatalogProjectMutation = {
    mutationFn: async (obj: DataStoreObject<CatalogProject>): Promise<void> => {
        await deleteObject(obj);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["catalogProjects", "__list__"],
        });
    },
};

export const useUpdateCatalogProject = (
    project: DataStoreObject<CatalogProject>,
    invalidateAll = false,
): UseMutationResult => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CatalogProject): Promise<void> => {
            await putObject<CatalogProject>({
                ...project,
                data: {
                    ...data,
                    __id: project.id,
                    __typeId: project.typeId,
                },
            });
        },
        onSuccess: () => {
            if (invalidateAll) {
                return queryClient.invalidateQueries({
                    queryKey: ["catalogProjects"],
                });
            } else {
                return queryClient.invalidateQueries({
                    queryKey: ["catalogProjects", project.id],
                });
            }
        },
    });
};

export const usePatchCatalogProject = (
    project: DataStoreObject<CatalogProject>,
): UseMutationResult => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: Partial<CatalogProject>): Promise<void> => {
            await putObject<CatalogProject>({
                ...project,
                data: {
                    ...project.data,
                    ...data,
                },
            });
        },
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: ["catalogProjects", project.id],
            });
        },
    });
};

export const catalogProjectQuery = (projectId) => ({
    queryKey: ["catalogProjects", projectId],
    queryFn: async (): Promise<DataStoreObject<CatalogProject>> =>
        await getObject(projectId),
});

export const useCatalogProject = (projectId) => {
    return useQuery(catalogProjectQuery(projectId));
};
