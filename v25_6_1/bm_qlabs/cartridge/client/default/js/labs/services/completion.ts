/* Services related to AI Completion */
import Handlebars from "handlebars/dist/cjs/handlebars";
import { egptGenerationsRequest } from "../api/einsteingpt";

function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

export async function generateCompletion(
    promptTemplate: string,
    context: unknown,
) {
    const template = Handlebars.compile(promptTemplate);
    const prompt = template(context);

    const response = await egptGenerationsRequest(
        prompt,
        "llmgateway__OpenAIGPT4Omni",
    );
    const generation = response.generations[0].text;
    // egpt html encodes the result
    return htmlDecode(generation);
}
