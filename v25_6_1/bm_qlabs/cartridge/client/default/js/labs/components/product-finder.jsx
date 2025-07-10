import { Controller, useForm } from "react-hook-form";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    Button,
    DataTable,
    DataTableColumn,
} from "@salesforce/design-system-react";
import { Modal } from "./modal";
import { InputField, SelectField } from "./forms";
import { SpinnerWithContainer } from "./spinner.jsx";
import { useCatalogs, useProductSearchQuery } from "../state/products";
import { MultiSelectComboBox } from "./combobox.jsx";

/**
 * Searches for products in a modal and allows the user to select products.
 *
 * On save the selected product IDs are provided as an array to the onSave callback.
 *
 * @param {DataStoreObject<CatalogProject>} project
 * @param onClose
 * @param isOpen
 * @return {Element}
 * @constructor
 */
export function ProductFinderDialog({
    onClose,
    isOpen,
    heading,
    onSave,
    saveLabel,
}) {
    const [searchState, setSearchState] = useState({});
    const [productsToImport, setProductsToImport] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm();

    const { data: catalogs, isLoading: isCatalogsLoading } = useCatalogs();

    const {
        data: results,
        isFetching,
        error,
    } = useQuery({
        ...useProductSearchQuery({
            productIds: [searchState.productId].filter(Boolean),
            type: searchState.type,
            productName: searchState.productName,
            catalogId: searchState.catalogId,
        }),
        enabled: !!(
            searchState.productId ||
            searchState.productName ||
            searchState.catalogId
        ),
    });

    const rows =
        results?.map((product) => {
            return {
                id: product.id,
                name: product.name.default,
                owning_catalog_id: product.owning_catalog_id,
            };
        }) || [];

    const searchProducts = (data) => {
        setProductsToImport([]);
        setSearchState({
            ...data,
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            ariaHideApp={false}
            footer={[
                <Button key="1" label="Cancel" onClick={onClose} />,
                <Button
                    key="2"
                    type="submit"
                    label={saveLabel || "Import"}
                    variant="brand"
                    disabled={productsToImport?.length === 0}
                    onClick={() => onSave(productsToImport.map((p) => p.id))}
                />,
            ]}
            onRequestClose={onClose}
            heading={heading || "Import Products"}
        >
            <section className="slds-p-around_large">
                <form onSubmit={handleSubmit(searchProducts)}>
                    <Controller
                        control={control}
                        name="type"
                        render={({
                            field: { onChange, onBlur, value, ref },
                        }) => {
                            const options = [
                                { id: "item", label: "Standard" },
                                { id: "master", label: "Main" },
                                { id: "variant", label: "Variant" },
                            ];

                            return (
                                <MultiSelectComboBox
                                    label="Product Type"
                                    error={errors.type}
                                    onSelect={(selection) => {
                                        onChange(selection.map((s) => s.id));
                                    }}
                                    onBlur={onBlur}
                                    selection={options.filter((o) =>
                                        value?.includes(o.id),
                                    )}
                                    options={options}
                                    ref={ref}
                                />
                            );
                        }}
                    />
                    <SelectField
                        label="Catalog"
                        {...register("catalogId")}
                        errors={errors.catalogId}
                    >
                        <option value="">Select a Catalog</option>
                        {!isCatalogsLoading &&
                            catalogs?.map((catalog) => {
                                return (
                                    <option key={catalog.id} value={catalog.id}>
                                        {catalog.name?.default || "n/a"} (
                                        {catalog.id})
                                    </option>
                                );
                            })}
                    </SelectField>
                    <InputField
                        label="Product ID"
                        {...register("productId")}
                        errors={errors.productId}
                    />
                    <InputField
                        label="Product Name"
                        {...register("productName")}
                        errors={errors.productName}
                    />
                    <div className="slds-m-vertical_medium">
                        <Button
                            type="submit"
                            label="Search"
                            variant="neutral"
                        />
                    </div>
                </form>
                <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
                    {isFetching && <SpinnerWithContainer />}
                    {error && <div>{error.message}</div>}
                    {results && (
                        <DataTable
                            items={rows}
                            columnBordered
                            fixedLayout
                            onRowChange={(event, data) => {
                                setProductsToImport(data.selection);
                            }}
                            selection={productsToImport}
                            selectRows="checkbox"
                        >
                            <DataTableColumn
                                label="Product ID"
                                property="id"
                                primaryColumn
                                truncate
                            />
                            <DataTableColumn label="Name" property="name" />
                            <DataTableColumn
                                label="Catalog"
                                property="owning_catalog_id"
                            />
                        </DataTable>
                    )}
                </div>
            </section>
        </Modal>
    );
}
