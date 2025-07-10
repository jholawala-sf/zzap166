import React, { useEffect, useState } from "react";
import DefaultLayout from "../layouts/default.jsx";
import { api as ocapi } from "../api/ocapi";

import {
    Dropdown,
    DataTable,
    DataTableColumn,
    DataTableCell,
    SplitView,
    SplitViewHeader,
    SplitViewListbox,
    Icon,
    Card,
    Button,
    CardFilter,
    PageHeaderControl,
    ButtonGroup,
    PageHeader,
} from "@salesforce/design-system-react";
import { Modal } from "../components/modal";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import {
    catalogProjectQuery,
    catalogProjectsQuery,
    createCatalogProjectMutation,
    deleteCatalogProjectMutation,
    useCatalogProject,
    useCatalogProjects,
    useUpdateCatalogProject,
} from "../state/catalog-projects";
import { useMutation, useQueries } from "@tanstack/react-query";
import {
    flattenProductToLocale,
    useLocalizedProducts,
} from "../state/products";
import { useProductAttributes } from "../state/system-objects";
import { SpinnerWithContainer } from "../components/spinner.jsx";
import { MultiSelectComboBox } from "../components/combobox.jsx";
import queryClient from "../query-client";
import { ProductFinderDialog } from "../components/product-finder.jsx";
import { useForm } from "react-hook-form";
import { InputField, SelectField } from "../components/forms";
import { useCurrentLocale, useCurrentLocaleLanguage } from "../state/global";
import { ControlledGenerativeField } from "../components/controlled-generative-field.jsx";
import { getStorefrontLink } from "../api/misc";
import { CONFIG } from "../config";
import { css } from "@emotion/react";
import { usePromptsByObjectAttribute } from "../state/prompts";
import { generateCompletion } from "../services/completion";

function ProjectsView() {
    const { data: projects } = useCatalogProjects();
    const params = useParams();
    const navigate = useNavigate();
    const createCatalogProject = useMutation(createCatalogProjectMutation());
    const listItems = projects.map((project) => ({
        id: project.id,
        label: project.data.name,
        bottomRightText: project.id.substring(0, 6),
        topRightText: project.creationDate,
    }));

    const selectedProject = listItems.find((li) => li.id === params.projectId);

    return (
        <>
            <SplitViewHeader
                key="1"
                onRenderActions={() => (
                    <PageHeaderControl>
                        <Button
                            label="New Project"
                            onClick={() => createCatalogProject.mutate()}
                        />
                    </PageHeaderControl>
                )}
                icon={<Icon category="standard" name="catalog" />}
                info={
                    <p className="slds-text-body_small">
                        {projects?.length} items
                    </p>
                }
                title={"Catalog Projects"}
                truncate
                variant="object-home"
            />
            <SplitViewListbox
                key="2"
                multiple
                options={listItems}
                events={{
                    onSelect: (event, { item }) => {
                        navigate(`/catalogs/${item.id}`);
                    },
                }}
                selection={[selectedProject]}
            />
        </>
    );
}

export function ProjectView() {
    const params = useParams();
    // using a key here to ensure a fresh component on project route change
    return <Project projectId={params.projectId} key={params.projectId} />;
}

function ProjectEditDialog({ project, isOpen, onClose }) {
    const updateCatalogProject = useUpdateCatalogProject(project, true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        values: project.data,
    });

    const onSaveHandler = (data) => {
        updateCatalogProject.mutate(data, {
            onSuccess: () => {
                onClose();
            },
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
                    label="Save"
                    disabled={updateCatalogProject.isLoading}
                    variant="brand"
                    onClick={handleSubmit(onSaveHandler)}
                />,
            ]}
            onRequestClose={onClose}
            heading={"Edit Project"}
        >
            <section className="slds-p-around_large">
                <form onSubmit={handleSubmit(onSaveHandler)}>
                    <InputField
                        label="Project Name"
                        {...register("name", {
                            required: true,
                            maxLength: 80,
                        })}
                        error={errors.name}
                    />
                </form>
            </section>
        </Modal>
    );
}

const StatusTableCell = ({ children, item }) => {
    var bgColor = "white";
    var color = "black";
    switch (children) {
        case "Pending":
            bgColor = "white";
            color = "black";
            break;
        case "Generating":
            bgColor = "blue";
            color = "white";
            break;
        case "Complete":
            bgColor = "green";
            color = "white";
            break;
        case "Error":
            bgColor = "red";
            color = "white";
            break;
    }
    return (
        <DataTableCell title={item.id}>
            <span style={{ backgroundColor: bgColor, color: color }}>
                {children}
            </span>
        </DataTableCell>
    );
};
StatusTableCell.displayName = DataTableCell.displayName;

function BulkGenerateDialog({ products, attributes, fields, onClose }) {
    const currentLocale = useCurrentLocale();
    const currentLanguage = useCurrentLocaleLanguage();
    const promptQueries = useQueries({
        queries: fields.map((field) => {
            const attribute = attributes.find(
                (attr) => attr.ocapi_id === field,
            );
            return usePromptsByObjectAttribute(
                "Product",
                attribute.effective_id,
            );
        }),
    });

    const loading = promptQueries.some((query) => query.isLoading);

    const { register, handleSubmit } = useForm({
        resetOptions: {
            keepDirtyValues: false,
        },
    });
    const [productStatusRows, setProductStatusRows] = useState(
        products.map((product) => ({
            id: product.id,
            ...fields.reduce((acc, field) => {
                acc[field] = "Pending";
                return acc;
            }, {}),
        })),
    );

    const promptQueriesById = promptQueries.reduce((acc, query) => {
        if (query.data) {
            query.data.map((prompt) => {
                acc[prompt.id] = prompt;
            });
        }
        return acc;
    }, {});

    const [_finished, setFinished] = useState(false);

    // TODO extract some of this
    const generateProductAttributes = useMutation({
        mutationFn: async (data) => {
            // TODO: this is hacky in that we update a cache here with the product patch so that it's
            // available in the inner loop here
            const productCache = {};
            for (const product of products) {
                for (const field of fields) {
                    const attr = attributes.find(
                        (attr) => attr.ocapi_id === field,
                    );
                    const promptId = data[field];
                    const prompt = promptQueriesById[promptId];
                    const row = productStatusRows.find(
                        (row) => row.id === product.id,
                    );
                    row[field] = "Generating";
                    setProductStatusRows([...productStatusRows]);
                    try {
                        const _product = productCache[product.id] || product;
                        const result = await generateCompletion(
                            prompt.data.body,
                            {
                                CurrentLanguage: currentLanguage.language,
                                Product: _product,
                            },
                        );
                        console.log(product.id, field, result);
                        const productRequest = {};
                        if (attr.localizable && attr.value_type === "html") {
                            productRequest[field] = {
                                [currentLocale]: {
                                    source: result,
                                },
                            };
                        } else if (attr.localizable) {
                            productRequest[field] = {
                                [currentLocale]: result,
                            };
                        } else {
                            productRequest[field] = result;
                        }
                        const productPatchResult = await ocapi.patch(
                            `/products/${product.id}`,
                            productRequest,
                        );
                        productCache[product.id] = flattenProductToLocale(
                            productPatchResult.data,
                            currentLocale,
                            attributes,
                        );
                    } catch (e) {
                        console.error(e);
                        row[field] = "Error";
                        setProductStatusRows([...productStatusRows]);
                        return;
                    }
                    row[field] = "Complete";
                    setProductStatusRows([...productStatusRows]);
                }
            }
            setFinished(true);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("products");
        },
    });

    return (
        <Modal
            isOpen={true}
            ariaHideApp={false}
            footer={[<Button key="1" label="Close" onClick={onClose} />]}
            onRequestClose={onClose}
            heading={"Bulk Generate"}
        >
            <section className="slds-p-around_large">
                <p>
                    Select the prompts for each field to generate values for the
                    products.{" "}
                    <span className={"slds-text-color_error"}>
                        Note: this bulk operation will overwrite any existing
                        values without confirmation. Recommend reviewing the
                        results individually after generation.
                    </span>
                </p>

                {loading && <SpinnerWithContainer />}
                {!loading && (
                    <form>
                        {fields.map((field, i) => {
                            const attribute = attributes.find(
                                (attr) => attr.ocapi_id === field,
                            );
                            const prompts = promptQueries[i].data;

                            return (
                                <SelectField
                                    key={field}
                                    label={`${
                                        attribute.display_name?.default ||
                                        attribute.id
                                    } (${attribute.effective_id})`}
                                    {...register(field)}
                                >
                                    {prompts?.map((prompt) => (
                                        <option
                                            key={prompt.id}
                                            value={prompt.id}
                                        >
                                            {prompt.data.name}
                                        </option>
                                    ))}
                                </SelectField>
                            );
                        })}
                    </form>
                )}
                <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
                    <DataTable
                        items={productStatusRows}
                        columnBordered
                        fixedLayout
                    >
                        {[
                            <DataTableColumn
                                key={0}
                                label="Product ID"
                                property="id"
                                primaryColumn
                                truncate
                            />,
                            ...fields.map((field, i) => (
                                <DataTableColumn
                                    key={i + 1}
                                    label={field}
                                    property={field}
                                ></DataTableColumn>
                            )),
                        ]}
                    </DataTable>
                </div>
                <Button
                    label="Generate"
                    variant="brand"
                    onClick={handleSubmit(generateProductAttributes.mutate)}
                    disabled={
                        loading ||
                        generateProductAttributes.isLoading ||
                        generateProductAttributes.isSuccess
                    }
                />
            </section>
        </Modal>
    );
}

function Project({ projectId }) {
    const [showOptions, setShowOptions] = useState(false);
    const [showImportProductsDialog, setShowImportProductsDialog] =
        useState(false);
    const [showProjectEditDialog, setShowProjectEditDialog] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showBulkGenerateDialog, setShowBulkGenerateDialog] = useState(false);
    const [productFilter, setProductFilter] = useState("");
    const navigate = useNavigate();
    const { data: projectObj, isLoading: isProjectLoading } =
        useCatalogProject(projectId);
    const project = projectObj?.data;

    const currentLocale = useCurrentLocale();
    const { data: products, isFetching: isProductsFetching } =
        useLocalizedProducts(project?.products || [], currentLocale);
    const { data: productAttributes } = useProductAttributes();

    const updateCatalogProject = useUpdateCatalogProject(projectObj);
    const deleteCatalogProject = useMutation(deleteCatalogProjectMutation);
    const deleteCatalogProjectHandler = () => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            deleteCatalogProject.mutate(projectObj, {
                onSuccess: () => {
                    navigate("/catalogs");
                },
            });
        }
    };
    const handleFilterChange = (ev) => {
        setProductFilter(ev.target.value);
    };

    const handleImportProducts = (productIds) => {
        updateCatalogProject.mutate({
            ...project,
            products: [...project.products, ...productIds],
        });
        setShowImportProductsDialog(false);
    };

    return (
        <>
            {showBulkGenerateDialog && (
                <BulkGenerateDialog
                    products={selectedProducts}
                    fields={project.columns}
                    attributes={productAttributes}
                    onClose={() => setShowBulkGenerateDialog(false)}
                />
            )}
            <ProjectEditDialog
                project={projectObj}
                isOpen={showProjectEditDialog}
                onClose={() => setShowProjectEditDialog(false)}
            />
            <ProductFinderDialog
                isOpen={showImportProductsDialog}
                onClose={() => setShowImportProductsDialog(false)}
                heading="Import Products"
                saveLabel={"Import"}
                onSave={handleImportProducts}
            />
            <PageHeader
                icon={<Icon category="standard" name="catalog" size="small" />}
                info={`${products?.length || "..."} products`}
                label={`${projectObj.id.substring(0, 6)}...`}
                onRenderActions={() => (
                    <PageHeaderControl>
                        <ButtonGroup
                            variant="list"
                            id="button-group-page-header-actions"
                        >
                            {/*<Button*/}
                            {/*    key={1}*/}
                            {/*    label="Sync Changes"*/}
                            {/*    variant="brand"*/}
                            {/*    onClick={handleImportProducts}*/}
                            {/*/>*/}
                            <Button
                                key={2}
                                label="Import Products"
                                variant="outline-brand"
                                onClick={() =>
                                    setShowImportProductsDialog(true)
                                }
                            />
                            <Button
                                key={3}
                                label="Delete Project"
                                variant="destructive"
                                onClick={deleteCatalogProjectHandler}
                            />
                        </ButtonGroup>
                    </PageHeaderControl>
                )}
                onRenderControls={() => (
                    <PageHeaderControl>
                        <ButtonGroup
                            variant="list"
                            id="button-group-page-header-controls"
                        >
                            <Button
                                iconCategory="utility"
                                iconName="edit"
                                iconVariant="border-filled"
                                variant="icon"
                                onClick={() => {
                                    setShowProjectEditDialog(
                                        !showProjectEditDialog,
                                    );
                                }}
                            />
                            <Button
                                iconCategory="utility"
                                iconName="table_settings"
                                iconVariant="border-filled"
                                variant="icon"
                                onClick={() => {
                                    setShowOptions(!showOptions);
                                }}
                            />
                        </ButtonGroup>
                    </PageHeaderControl>
                )}
                title={project?.name || "Project"}
                truncate
                variant="object-home"
            />

            {showOptions && (
                <Card
                    className="slds-m-vertical_medium"
                    heading={`Project Configuration`}
                >
                    <div className="slds-p-around_medium">
                        <MultiSelectComboBox
                            label="Product Attributes"
                            options={productAttributes?.map((attr) => ({
                                id: attr.ocapi_id,
                                label:
                                    attr.display_name?.default ||
                                    attr.effective_id,
                                subTitle: attr.effective_id,
                            }))}
                            selection={
                                productAttributes
                                    ?.filter((attr) =>
                                        project.columns.includes(attr.ocapi_id),
                                    )
                                    .map((attr) => ({
                                        id: attr.ocapi_id,
                                        label:
                                            attr.display_name?.default ||
                                            attr.effective_id,
                                        subTitle: attr.effective_id,
                                    })) || []
                            }
                            onSelect={(value) => {
                                updateCatalogProject.mutate({
                                    ...project,
                                    columns: value.map((v) => v.id),
                                });
                            }}
                            menuItemVisibleLength={5}
                            disabled={updateCatalogProject.isLoading}
                        />
                    </div>
                </Card>
            )}
            <Card
                className="slds-m-vertical_medium"
                heading={`Products`}
                filter={
                    <CardFilter
                        onChange={handleFilterChange}
                        placeholder="Filter..."
                    />
                }
                headerActions={[
                    <Button
                        key={1}
                        disabled={selectedProducts.length === 0}
                        label="Generate"
                        variant="brand"
                        onClick={() => setShowBulkGenerateDialog(true)}
                    />,
                    <Button
                        key={2}
                        disabled={selectedProducts.length === 0}
                        label="Translate"
                        variant="brand"
                        onClick={() => {
                            alert("Translations functional coming soon");
                        }}
                    />,
                ]}
            >
                {isProjectLoading || isProductsFetching ? (
                    <SpinnerWithContainer />
                ) : (
                    <ProductTable
                        filter={productFilter}
                        products={products}
                        attributes={productAttributes}
                        columns={project.columns}
                        onEditProduct={(productId) => {
                            setEditingProduct(productId);
                        }}
                        onSelection={setSelectedProducts}
                        onRemoveProduct={(productId) => {
                            updateCatalogProject.mutate({
                                ...project,
                                products: project.products.filter(
                                    (id) => id !== productId,
                                ),
                            });
                        }}
                    />
                )}
            </Card>
            {editingProduct && (
                <ProductEditor
                    onClose={() => setEditingProduct(null)}
                    productId={editingProduct}
                    fields={project.columns}
                />
            )}
        </>
    );
}

const productIDStyles = css`
    font-family: monospace;
`;

const ProductIDTableCell = ({ children, item }) => {
    return (
        <DataTableCell title={item.id}>
            <span css={productIDStyles}>{children}</span>
        </DataTableCell>
    );
};
ProductIDTableCell.displayName = DataTableCell.displayName;

const ActionTableCell = ({ onEdit, options, onAction, item }) => {
    return (
        <DataTableCell title={item.id}>
            <ButtonGroup>
                <Button
                    iconCategory="utility"
                    iconName="edit"
                    iconSize="small"
                    iconVariant="border-filled"
                    variant="icon"
                    onClick={() => onEdit(item.id)}
                />
                <Dropdown
                    iconCategory="utility"
                    iconName="down"
                    iconSize="small"
                    iconVariant="border-filled"
                    options={options}
                    onSelect={(action) => {
                        onAction(item, action);
                    }}
                />
            </ButtonGroup>
        </DataTableCell>
    );
};
ActionTableCell.displayName = DataTableCell.displayName;

function ProductTable({
    products,
    attributes,
    columns,
    filter,
    onEditProduct,
    onRemoveProduct,
    onSelection,
}) {
    const currentLocale = useCurrentLocale();
    const [selection, setSelection] = useState([]);

    const filteredProducts =
        products?.filter((item) => {
            if (filter) {
                return (
                    item.name.toLowerCase().includes(filter.toLowerCase()) ||
                    item.id.toLowerCase().includes(filter.toLowerCase())
                );
            }
            return true;
        }) || [];

    const handleChanged = (event, data) => {
        setSelection(data.selection);
        onSelection(data.selection);
        console.log(event, data);
    };

    const launchComposableStorefront = (pid) => {
        var locale = currentLocale;
        if (locale === "default" || !locale.includes("-")) {
            locale = "en-US";
        }

        const p = CONFIG.composableConfiguration.managedRuntimeProject;
        const e = CONFIG.composableConfiguration.managedRuntimeEnvironment;
        const url = `https://${p}-${e}.mobify-storefront.com/${CONFIG.currentSite}/${locale}/product/${pid}`;
        window.open(url, "_blank");
    };

    const launchStorefront = async (pid) => {
        const { url } = await getStorefrontLink(
            pid,
            CONFIG.currentSite,
            currentLocale,
        );
        window.open(url, "_blank");
    };

    const handleRowAction = (item, action) => {
        switch (action.value) {
            case "edit":
                console.log("edit", item.id);
                onEditProduct && onEditProduct(item.id);
                break;
            case "remove":
                console.log("remove", item.id);
                onRemoveProduct && onRemoveProduct(item.id);
                break;
            case "storefront":
                launchStorefront(item.id);
                break;
            case "composable":
                launchComposableStorefront(item.id);
                break;
        }
    };

    const _columns =
        columns?.map((column) => ({
            label:
                attributes?.find((attr) => attr.ocapi_id === column)
                    ?.display_name?.default || column,
            property: column,
            title: column,
        })) || [];

    return (
        <DataTable
            assistiveText={{
                actionsHeader: "actions",
                columnSort: "sort this column",
                columnSortedAscending: "asc",
                columnSortedDescending: "desc",
                selectAllRows: "Select all rows",
                selectRow: "Select this row",
            }}
            fixedLayout
            keyboardNavigation
            items={filteredProducts}
            id="DataTableExample-2"
            onRowChange={handleChanged}
            selection={selection}
            selectRows="checkbox"
        >
            {[
                <DataTableColumn
                    key={0}
                    label="ID"
                    primaryColumn
                    property="id"
                    onClick={() => console.log("click")}
                    width="8rem"
                >
                    <ProductIDTableCell onEdit={(id) => onEditProduct(id)} />
                </DataTableColumn>,
                <DataTableColumn
                    key={1}
                    label="Name"
                    property="name"
                    width="10rem"
                />,
                ...[
                    ..._columns.map((column, i) => (
                        <DataTableColumn
                            key={i + 2}
                            label={column.label}
                            title={column.title}
                            property={column.property}
                        />
                    )),
                ],
                <DataTableColumn key={99} label="Actions" width="4rem">
                    <ActionTableCell
                        onEdit={(id) => onEditProduct(id)}
                        options={[
                            {
                                id: 0,
                                label: "Edit",
                                value: "edit",
                                leftIcon: {
                                    name: "edit",
                                    category: "utility",
                                },
                            },
                            {
                                id: 1,
                                label: "Remove",
                                value: "remove",
                                leftIcon: {
                                    name: "delete",
                                    category: "utility",
                                },
                            },
                            {
                                id: 2,
                                label: "Storefront",
                                value: "storefront",
                                // disable unless the user selects a site context
                                disabled: CONFIG.currentSite === "Sites-Site",
                                leftIcon: {
                                    name: "link",
                                    category: "utility",
                                },
                            },
                            CONFIG.composableConfiguration && {
                                id: 3,
                                label: "Composable",
                                value: "composable",
                                disabled: CONFIG.currentSite === "Sites-Site",
                                leftIcon: {
                                    name: "link",
                                    category: "utility",
                                },
                            },
                        ].filter(Boolean)}
                        onAction={handleRowAction}
                    />
                </DataTableColumn>,
            ]}
        </DataTable>
    );
}

function ProductEditor({ productId, fields, onClose }) {
    const currentLocale = useCurrentLocale();
    // TODO singular version of this
    const { data: products, isLoading: isProductLoading } =
        useLocalizedProducts([productId], currentLocale);
    var product = products?.[0];

    const { data: productAttributes, isLoading: isProductAttributesLoading } =
        useProductAttributes();

    // TODO: move to products module
    const updateProduct = useMutation({
        mutationFn: async (data) => {
            // translate non-localized structure back to current locale
            const productData = {
                name: {
                    [currentLocale]: data.name,
                },
                ...fields.reduce((acc, field) => {
                    const attr = productAttributes.find(
                        (attr) => attr.ocapi_id === field,
                    );
                    if (attr.localizable && attr.value_type === "html") {
                        acc[field] = {
                            [currentLocale]: {
                                source: data[field],
                            },
                        };
                    } else if (attr.localizable) {
                        acc[field] = {
                            [currentLocale]: data[field],
                        };
                    } else {
                        acc[field] = data[field];
                    }
                    return acc;
                }, {}),
            };
            return await ocapi.patch(`/products/${productId}`, productData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm({
        values: {
            name: product?.name,
            ...fields.reduce((acc, field) => {
                acc[field] = product?.[field] ?? "";
                return acc;
            }, {}),
        },
        resetOptions: {
            keepDirtyValues: true,
        },
    });

    useEffect(() => {
        reset();
    }, [productId]);

    return (
        <Modal
            isOpen={true}
            ariaHideApp={false}
            size="small"
            footer={[
                <Button key="1" label="Close" onClick={onClose} />,
                <Button
                    key="2"
                    type="submit"
                    label="Save"
                    variant="brand"
                    onClick={handleSubmit(updateProduct.mutate)}
                />,
            ]}
            onRequestClose={onClose}
            heading={`Edit Product ${productId}`}
        >
            {isProductLoading && <SpinnerWithContainer />}
            {product && (
                <form
                    onSubmit={handleSubmit(updateProduct.mutate)}
                    className="slds-p-around--medium"
                >
                    <InputField
                        label="Product ID"
                        value={product.id}
                        readOnly={true}
                    />

                    <InputField
                        label="Product Name"
                        {...register("name", {
                            required: true,
                            maxLength: 80,
                        })}
                        error={errors.name}
                    />

                    {!isProductAttributesLoading &&
                        fields.map((field) => {
                            const attribute = productAttributes.find(
                                (attr) => attr.ocapi_id === field,
                            );
                            return (
                                <ControlledGenerativeField
                                    control={control}
                                    key={field}
                                    field={field}
                                    attribute={attribute}
                                    object={product}
                                />
                            );
                        })}
                </form>
            )}
        </Modal>
    );
}

export default function CatalogManager() {
    return (
        <DefaultLayout>
            <SplitView
                masterWidth={"375px"}
                master={<ProjectsView />}
                detail={
                    <div className="slds-m-left_medium slds-grid slds-grid_vertical">
                        <Outlet />
                    </div>
                }
            />
        </DefaultLayout>
    );
}

export const ROUTES = [
    {
        path: "catalogs",
        element: <CatalogManager />,
        loader: async () => {
            const query = catalogProjectsQuery();
            return await queryClient.ensureQueryData(query);
        },
        handle: {
            crumb: () => "Catalog Projects",
        },
        children: [
            {
                index: true,
                element: (
                    <div className="slds-card slds-p-around--large">
                        Choose or create a project
                    </div>
                ),
            },
            {
                path: ":projectId",
                element: <ProjectView />,
                loader: async ({ params }) => {
                    const query = catalogProjectQuery(params.projectId);
                    return await queryClient.ensureQueryData(query);
                },
                handle: {
                    crumb: (data) => {
                        return `Project ${data.id.substring(0, 6)}...`;
                    },
                },
            },
        ],
    },
];
