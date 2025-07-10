export enum EditablePropType {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
    OBJECT = "object",
    TEMPLATE = "template",
    QUERY = "query",
}

export interface EditablePropDefinition {
    name: string;
    type: EditablePropType;
    defaultValue?: any;
    description?: string;
    required?: boolean;
}

interface EditableProps {
    [key: string]: EditablePropDefinition;
}

export interface EditableReactComponent<T> extends React.FC<T> {
    displayName: string;
    __editableProps: EditableProps;
}
