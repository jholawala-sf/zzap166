// THIS IS A GRAB BAG OF TESTING CODE SO A BIT OF A MESS

/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DefaultLayout from "../layouts/default.jsx";
import { getCodeVersions, getProduct } from "../api/ocapi";
import { getFile } from "../api/webdav";
import { attributesQuery } from "../state/system-objects";
import { useForm } from "react-hook-form";
import { searchObjects } from "../api/data";
import { Button, Card } from "@salesforce/design-system-react";
import { InputField, SelectField, TextAreaField } from "../components/forms";
import { useGlobalState } from "../state/global";
import { createProductPromotion } from "../services/tools/promotion";

function DataObjectExplorer() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [searchState, setSearchState] = useState({});

    const {
        data: results,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["dataStore", "search", searchState],
        queryFn: async () => {
            console.log("searching", searchState);
            return await searchObjects(searchState.typeId, {
                attrs: searchState.attrs,
                attributeOperator: searchState.attributeOperator,
            });
        },
        enabled: !!searchState.typeId,
    });

    const submit = (data) => {
        var attrs;
        try {
            attrs = JSON.parse(data.attrs);
        } catch (e) {
            /* ignore  */
        }
        setSearchState({
            typeId: data.typeId,
            attributeOperator: data.attributeOperator,
            _date: Date.now(),
            attrs: attrs,
        });
    };
    return (
        <Card heading="Data Objects">
            <div className="slds-p-around_small">
                <div className="slds-form-element__control">
                    <form onSubmit={handleSubmit(submit)}>
                        <InputField
                            label="Type ID"
                            {...register("typeId", {
                                required: true,
                                maxLength: 80,
                            })}
                            error={errors.typeId}
                        />

                        <SelectField
                            label="Operator"
                            {...register("attributeOperator", {})}
                            error={errors.attributeOperator}
                        >
                            <option value="AND">AND</option>
                            <option value="OR">OR</option>
                        </SelectField>

                        <TextAreaField
                            rows={5}
                            label="Attributes (JSON object)"
                            {...register("attrs")}
                        />

                        <Button
                            type="submit"
                            label="Search Objects"
                            variant="brand"
                        />
                    </form>
                </div>
                <div>
                    {error && (
                        <div className="slds-text-color_error">
                            <code>
                                <pre>{JSON.stringify(error, null, 2)}</pre>
                            </code>
                        </div>
                    )}

                    {!isLoading && (
                        <code>
                            <pre>{JSON.stringify(results, null, 2)}</pre>
                        </code>
                    )}
                </div>
            </div>
        </Card>
    );
}

/**
 * Testing Page
 * @return {JSX.Element}
 * @constructor
 */
function Testing() {
    const { setError } = useGlobalState();
    const { data: codeVersions } = useQuery(["codeVersions"], getCodeVersions, {
        placeholderData: [],
    });
    const [pid, setPid] = useState("");
    const [filename, setFilename] = useState("");
    const [objectType, setObjectType] = useState("");
    const { data: product, error: productError } = useQuery(
        ["product", { pid }],
        async () => pid && getProduct(pid),
        {
            retry: false,
        },
    );
    const { data: file, error: fileError } = useQuery(
        ["file", { filename }],
        async () => filename && getFile(filename),
        {
            retry: false,
        },
    );
    const { data: object } = useQuery({
        ...attributesQuery(objectType),
        enabled: !!objectType,
    });

    const createPromotionHandler = async () => {
        createProductPromotion(
            {},
            {
                site_id: "yeti",
                promotion_id: "testing-promo-" + new Date().getTime(),
                callout_message: "This is a test promotion",
                discount_type: "percent",
                discount_amount: 10,
                product_ids: ["7016440000000000001"],
            },
        );
    };

    return (
        <>
            <DefaultLayout>
                <div className="slds-m-vertical_medium">
                    <span className="slds-text-color--error">
                        This section is for testing only. It contains nothing
                        useful for users
                    </span>
                </div>
                <div className="slds-m-vertical_medium">
                    <Button
                        label="Set Error"
                        variant="destructive"
                        onClick={() => setError("This is an error")}
                    />
                    <Button
                        label="Promotion"
                        variant="destructive"
                        onClick={createPromotionHandler}
                    />
                </div>
                <div className="slds-m-vertical_medium">
                    <h2 className="slds-text-heading--medium slds-m-vertical_small">
                        Code Versions (OCAPI)
                    </h2>
                    {codeVersions?.map((codeVersion) => {
                        return (
                            <div key={codeVersion.id}>
                                <h3>{codeVersion.id}</h3>
                                <p>{codeVersion.active}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="slds-m-vertical_medium">
                    <h2 className="slds-text-heading--medium slds-m-vertical_small">
                        Products (OCAPI)
                    </h2>
                    <div className="slds-form-element">
                        <label
                            className="slds-form-element__label"
                            htmlFor="product-id"
                        >
                            Product ID ({pid}):
                        </label>
                    </div>
                </div>
                <article className="slds-card">
                    <div className="slds-card__header slds-grid">
                        <header className="slds-media slds-media_center slds-has-flexi-truncate">
                            <div className="slds-media__body">
                                <h2 className="slds-card__header-title">
                                    Product
                                </h2>
                            </div>
                        </header>
                    </div>
                    <div className="slds-card__body slds-card__body_inner">
                        <div className="slds-form-element__control">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setPid(e.target.productId.value);
                                }}
                            >
                                <input
                                    type="text"
                                    name="productId"
                                    className="slds-input"
                                    placeholder="Product ID"
                                />
                                <button
                                    type="submit"
                                    className="slds-button slds-button_brand"
                                >
                                    Get Product
                                </button>
                            </form>
                        </div>
                        <div>
                            {productError && (
                                <code>
                                    <pre>
                                        {JSON.stringify(productError, null, 2)}
                                    </pre>
                                </code>
                            )}
                            <code>
                                <pre>{JSON.stringify(product, null, 2)}</pre>
                            </code>
                        </div>
                    </div>
                </article>

                <div className="slds-m-vertical_medium">
                    <h2 className="slds-text-heading--medium slds-m-vertical_small">
                        WebDAV
                    </h2>
                    <div className="slds-form-element">
                        <label
                            className="slds-form-element__label"
                            htmlFor="product-id"
                        >
                            Filename ({filename}):
                        </label>
                    </div>
                </div>
                <article className="slds-card">
                    <div className="slds-card__header slds-grid">
                        <header className="slds-media slds-media_center slds-has-flexi-truncate">
                            <div className="slds-media__body">
                                <h2 className="slds-card__header-title">
                                    Product
                                </h2>
                            </div>
                        </header>
                    </div>
                    <div className="slds-card__body slds-card__body_inner">
                        <div className="slds-form-element__control">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setFilename(e.target.filename.value);
                                }}
                            >
                                <input
                                    type="text"
                                    name="filename"
                                    className="slds-input"
                                    placeholder="Filename"
                                />
                                <button
                                    type="submit"
                                    className="slds-button slds-button_brand"
                                >
                                    Get File
                                </button>
                            </form>
                        </div>
                        <div>
                            {fileError && (
                                <code>
                                    <pre>
                                        {JSON.stringify(fileError, null, 2)}
                                    </pre>
                                </code>
                            )}
                            <code>
                                <pre>{file}</pre>
                            </code>
                        </div>
                    </div>
                </article>

                <div className="slds-m-vertical_medium">
                    <h2 className="slds-text-heading--medium slds-m-vertical_small">
                        System Objects
                    </h2>
                    <div className="slds-form-element">
                        <label
                            className="slds-form-element__label"
                            htmlFor="product-id"
                        >
                            Object ({objectType}):
                        </label>
                    </div>
                </div>
                <article className="slds-card">
                    <div className="slds-card__header slds-grid">
                        <header className="slds-media slds-media_center slds-has-flexi-truncate">
                            <div className="slds-media__body">
                                <h2 className="slds-card__header-title">
                                    Object Type
                                </h2>
                            </div>
                        </header>
                    </div>
                    <div className="slds-card__body slds-card__body_inner">
                        <div className="slds-form-element__control">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setObjectType(e.target.object.value);
                                }}
                            >
                                <input
                                    type="text"
                                    name="object"
                                    className="slds-input"
                                />
                                <button
                                    type="submit"
                                    className="slds-button slds-button_brand"
                                >
                                    Get Object
                                </button>
                            </form>
                        </div>
                        <div>
                            {object && (
                                <code>
                                    <pre>{JSON.stringify(object, null, 2)}</pre>
                                </code>
                            )}
                        </div>
                    </div>
                </article>
                <DataObjectExplorer />
            </DefaultLayout>
        </>
    );
}

export const ROUTES = [
    {
        path: "testing",
        element: <Testing />,
        handle: {
            crumb: "Testing Page",
        },
    },
];
