// This is a test type
import { createDataStoreHooks } from "../api/data";

enum WidgetType {
    FOO = "FOO",
    BAR = "BAR",
}

export interface Widget {
    name: string;
    type: WidgetType;
    description: string;
    isFun: boolean;
}

const defaultWidget: Widget = {
    name: "New Widget",
    description: "",
    isFun: false,
    type: undefined,
};

export const {
    useList: useWidgets,
    useItem: useWidget,
    useFind: useFindWidgets,
    useCreate: useCreateWidget,
    useUpdate: useUpdateWidget,
    usePatch: usePatchWidget,
    useDelete: useDeleteWidget,
    queries: { list: widgetsQuery, item: widgetQuery },
} = createDataStoreHooks<Widget>({
    typeId: "widget",
    queryableAttributes: ["name", "type"],
    defaultData: defaultWidget,
});
