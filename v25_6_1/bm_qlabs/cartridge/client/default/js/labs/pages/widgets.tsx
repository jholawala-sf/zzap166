import { useEffect } from "react";
import { useForm } from "react-hook-form";
import DefaultLayout from "../layouts/default.jsx";

import {
    Button,
    Card,
    Icon,
    PageHeaderControl,
    SplitView,
    SplitViewHeader,
    SplitViewListbox,
} from "@salesforce/design-system-react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { SortOrder } from "../api/data.ts";
import {
    InputField
} from "../components/forms";
import queryClient from "../query-client.ts";
import {
    useCreateWidget,
    useDeleteWidget,
    useFindWidgets,
    useUpdateWidget,
    useWidget,
    useWidgets,
    widgetQuery,
    widgetsQuery,
} from "../state/widget.ts";

function WidgetsView() {
    const params = useParams();
    const navigate = useNavigate();
    const { data: widgets2 } = useWidgets();
    const { data: widgets, isLoading } = useFindWidgets({
        sort: [
            {
                field: "creation_date",
                sortOrder: SortOrder.ASC
            },
        ],
    });
    const createWidget = useCreateWidget();
    const listItems =
        widgets?.map((widget) => ({
            id: widget.id,
            label: widget.data.name,
            bottomLeftText: widget.data.type,
            bottomRightText: widget.id.substring(0, 6),
            topRightText: widget.creationDate,
        })) ?? [];

    const selectedWidget = listItems?.find((li) => li.id === params.widgetId);

    return (
        <>
            <SplitViewHeader
                key="1"
                onRenderActions={() => (
                    <PageHeaderControl>
                        <Button
                            label="New Widget"
                            onClick={() =>
                                createWidget.mutate({ name: "Hello" })
                            }
                        />
                    </PageHeaderControl>
                )}
                icon={<Icon size="small" name="catalog" />}
                info={
                    <p className="slds-text-body_small">
                        {widgets?.length} items
                    </p>
                }
                title={"Widgets"}
                truncate
                variant="object-home"
            />
            <SplitViewListbox
                key="2"
                multiple
                options={listItems}
                events={{
                    onSelect: (_event, { item }) => {
                        navigate(`/widgets/${item.id}`);
                    },
                }}
                selection={[selectedWidget]}
            />
        </>
    );
}

export function WidgetView() {
    const params = useParams();
    // using a key here to ensure a fresh component on project route change
    return <Widget widgetId={params.widgetId} key={params.widgetId} />;
}

function Widget({ widgetId }) {
    const navigate = useNavigate();
    const { data: widgetObj, isLoading: isWidgetLoading } = useWidget(widgetId);
    const widget = widgetObj?.data;

    const deleteWidget = useDeleteWidget();
    const deleteWidgetHandler = () => {
        if (window.confirm("Are you sure you want to delete this widget?")) {
            deleteWidget.mutate(widgetObj, {
                onSuccess: () => {
                    navigate("/widgets");
                },
            });
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
        reset,
    } = useForm({ defaultValues: widget });
    useEffect(() => {
        reset(widget);
    }, [isWidgetLoading]);
    const updateWidget = useUpdateWidget(widgetObj);

    const onSubmit = (data) => {
        updateWidget.mutate(data);
    };

    return (
        <Card
            heading={widget?.name}
            icon={<Icon size="small" name={"catalog"} />}
            headerActions={
                <PageHeaderControl>
                    <Button
                        label="Delete"
                        variant="destructive"
                        onClick={deleteWidgetHandler}
                    />
                </PageHeaderControl>
            }
        >
            <div className="slds-p-around_medium">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        label="Widget Name"
                        name="name"
                        {...register("name", {
                            required: true,
                            maxLength: 80,
                        })}
                        error={errors.name}
                    />
                    <Button label="Save" variant="brand" type="submit" />
                </form>
            </div>
        </Card>
    );
}

export default function WidgetsManager() {
    return (
        <DefaultLayout>
            <SplitView
                masterWidth={"375px"}
                master={<WidgetsView />}
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
        path: "widgets",
        element: <WidgetsManager />,
        loader: async () => {
            return await queryClient.ensureQueryData(widgetsQuery);
        },
        handle: {
            crumb: () => "Widgets",
        },
        children: [
            {
                index: true,
                element: (
                    <div className="slds-card slds-p-around--large">
                        Choose or create a widget
                    </div>
                ),
            },
            {
                path: ":widgetId",
                element: <WidgetView />,
                loader: async ({ params }) => {
                    const query = widgetQuery(params.widgetId);
                    return await queryClient.ensureQueryData(query);
                },
                handle: {
                    crumb: (data) => {
                        return `Widget ${data.id.substring(0, 6)}...`;
                    },
                },
            },
        ],
    },
];
