import React from "react";
import JsxParser from "react-jsx-parser";
import { ALLOWED_COMPONENTS } from "./registry";

// make these undefined in the context of the tagged template calling function below
const DENYLIST_CONTEXT = [
    ...Object.keys(typeof window !== "undefined" ? window : {}),
    "window",
    "eval",
    "Function",
];

/**
 * This helper functions transforms a raw "jsx string" into a react component tree
 * using the above htm binded to the h function.
 *
 * The htm library will use this bound callback to transform elements to react components
 * via createElement replacing elements that match allowed components with their corresponding
 * component values from the ALLOWED_COMPONENTS object.
 *
 * htm uses tagged template literals. in fact the html function above is a tagged template function.
 * we utilize this allow for basic expression use in the jsx string for attributes and children
 * by constructing a function that executes the tagged template function `html` with a simple context
 * that (currently) consists only of the allowed components
 *
 * This allows us to use basic expressions i.e. <Box width={[100, 200, 300]}></Box> and components-as-props
 * conventions used in chakra ui i.e. <Link as={RouteLink} to="/"></Link> while shielding the template from any other
 * available calling context.
 *
 * Since the JSX syntax we are supporting is slightly different than the tagged template syntax expected here. namely
 * the expression syntax must begin with a $ symbol: i.e. <Box width=${[100, 200, 300]}></Box> we must first transform
 * the string to replace all instances the jsx expression syntax with the tagged template
 */
export function jsxToReact(jsxString: string, { props }): React.ReactNode {
    const allowedComponents = ALLOWED_COMPONENTS;

    return (
        <JsxParser
            bindings={{
                ...props,
            }}
            onError={(e) => {
                throw e;
            }}
            components={allowedComponents}
            jsx={jsxString}
            renderInWrapper={false}
        />
    );
}
