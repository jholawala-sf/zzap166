import { useQuery } from "@tanstack/react-query";
import { api as ocapi } from "../api/ocapi";
import type { LocalizedString, ObjectAttribute } from "./types";
import { useProductAttributes } from "./system-objects";
import { snakeCaseToCamelCase } from "../utils";

interface Product {
    id: string;
    display_name: LocalizedString;
    shortDescription: LocalizedString;
    longDescription: LocalizedString;

    [key: string]: any;
}

export function useProductsQuery(productIds: string[]) {
    return {
        queryKey: ["products", productIds],
        queryFn: async (): Promise<Product[]> => {
            return (
                await ocapi.post(`product_search`, {
                    query: {
                        term_query: {
                            fields: ["id"],
                            operator: "one_of",
                            values: productIds,
                        },
                    },
                    select: "(**)",
                    count: 100,
                })
            ).data.hits;
        },
    };
}

export function useProductQuery(productId: string) {
    return {
        queryKey: ["products", productId],
        queryFn: async (): Promise<Product> => {
            return (await ocapi.get(`products/${productId}?select=(**)`)).data;
        },
    };
}
export function useProduct(productId: string) {
    return useQuery(useProductQuery(productId));
}

enum ProductType {
    Standard = "item",
    Variant = "variant",
    Main = "master",
}
interface ProductSearchArguments {
    productIds?: string[];
    type?: ProductType[];
    productName?: string;
    catalogId?: string;
}

export function useProductSearchQuery(searchArgs: ProductSearchArguments) {
    return {
        queryKey: ["products", "search", searchArgs],
        queryFn: async (): Promise<Product[]> => {
            const { productIds, productName } = searchArgs;
            const query: any = {
                bool_query: {
                    must: [],
                },
            };
            if (productIds && productIds.length > 0) {
                query.bool_query.must.push({
                    term_query: {
                        fields: ["id"],
                        operator: "one_of",
                        values: productIds,
                    },
                });
            }
            if (productName) {
                query.bool_query.must.push({
                    text_query: {
                        fields: ["name"],
                        search_phrase: productName,
                    },
                });
            }
            if (searchArgs.catalogId) {
                query.bool_query.must.push({
                    term_query: {
                        fields: ["catalog_id"],
                        operator: "is",
                        values: [searchArgs.catalogId],
                    },
                });
            }
            if (searchArgs.type) {
                query.bool_query.must.push({
                    term_query: {
                        fields: ["type"],
                        operator: "one_of",
                        values: searchArgs.type,
                    },
                });
            }
            return (
                (
                    await ocapi.post(`product_search`, {
                        query,
                        count: 100,
                        select: "(**)",
                    })
                ).data?.hits || []
            );
        },
    };
}

export function useProducts(productIds: string[]) {
    return useQuery({
        ...useProductsQuery(productIds),
        enabled: productIds?.length > 0,
    });
}

interface Catalog {
    id: string;
    name: LocalizedString;
}
export function useCatalogs() {
    return useQuery({
        queryKey: ["catalogs"],
        queryFn: async (): Promise<Catalog[]> => {
            return (await ocapi.get(`catalogs?select=(**)&count=100`)).data
                .data;
        },
    });
}

export function flattenProductToLocale(
    product: Product,
    locale: string,
    productAttributes: ObjectAttribute[],
) {
    const productAttributesById = productAttributes?.reduce(
        (acc, attribute) => {
            acc[attribute.effective_id] = attribute;
            return acc;
        },
        {},
    );
    const _product = {
        ...product,
    };
    Object.keys(product).forEach((key) => {
        // this is a bit weird because the object attributes are not in OCAPI snake case
        const attr: ObjectAttribute =
            productAttributesById &&
            (productAttributesById[key] ||
                productAttributesById[snakeCaseToCamelCase(key)]);
        if (attr && attr.localizable) {
            if (attr.value_type === "html") {
                _product[key] = product[key][locale]?.source;
            } else {
                _product[key] = product[key][locale];
            }
        }
    });
    return _product;
}

export function useLocalizedProducts(productIds: string[], locale: string) {
    const { data: productAttributes, isSuccess } = useProductAttributes();
    const result = useQuery({
        ...useProductsQuery(productIds),
        queryKey: ["products", productIds, locale],
        enabled: productIds?.length > 0 && isSuccess && !!productAttributes,
        select: (data: Product[]) => {
            return data?.map((product) =>
                flattenProductToLocale(
                    product,
                    locale,
                    productAttributes || [],
                ),
            );
        },
    });

    return result;
}
