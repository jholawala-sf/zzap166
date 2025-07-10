import { COMPONENT_SCHEMA } from "./schemas";
import type { ChatContext } from "../../types";

export async function createComponentMetadata(
    context: ChatContext,
    parameters: any,
) {
    return {
        success: true,
        message: "Component metadata created successfully",
        component_metadata: JSON.stringify(parameters, null, 2),
    };
}

createComponentMetadata.schema = {
    name: "create_component_metadata",
    description: `Creates a new component given the users requirements.
Important: Display the component_metadata to the user formatted in a JSON code block.
Note: there is no number or price type, use integer or string type instead.`,
    parameters: COMPONENT_SCHEMA,
};
