import {
    api as ocapi,
    getSiteCartridges,
    siteArchiveImport,
} from "../api/ocapi";
import { api as componentInfo } from "../api/componentinfo";
import { CONFIG } from "../config";
import { listFiles } from "../api/webdav";
import { useQuery } from "@tanstack/react-query";
import { egptSystemGenerationsRequest } from "../api/einsteingptsystem.ts";
import { uuid4 } from "../utils.ts";
import { createImpexZipFile } from "../api/webdav";

import { decodeEGPTOutput } from "../services/action-planner/utils.ts";

import xml2js from "xml2js";

interface Region {
    id: string;
    name: string;
}

interface ExperiencePage {
    name: string;
    regions: Region[];
}

interface ExperienceAttribute {
    id: string;
    name: string;
    type: string;
    required: boolean;
}

interface ExperienceComponent {
    name: string;
    typeId: string;
    description: string;
    attributes: ExperienceAttribute[];
    regions: Region[];
}

interface APIExperienceComponent {
    name: string;
    type_id: string;
    description: string;
    attribute_definition_groups?: {
        attribute_definitions: ExperienceAttribute[];
    }[];
    region_definitions?: Region[];
}

// TODO move
export function useSiteCartridges() {
    return useQuery<string[]>({
        queryKey: ["site", "cartridges"],
        queryFn: async () => {
            return getSiteCartridges(CONFIG.currentSite);
        },
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });
}

// TODO MOVE
export function useActiveCodeVersion() {
    return useQuery<string>({
        queryKey: ["code-version"],
        queryFn: async () => {
            return (await ocapi.get("code_versions")).data.data.find(
                (cv: { active: boolean }) => cv.active,
            ).id;
        },
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });
}

/**
 * Get all the experience pages availables for the current site
 */
export function useExperiencePages() {
    const { data: cartridges } = useSiteCartridges();
    const { data: activeCodeVersion } = useActiveCodeVersion();

    return useQuery<string[]>({
        queryKey: ["experience", "pages"],
        queryFn: async () => {
            var pageFiles: string[] = [];
            for (const cartridge of cartridges) {
                try {
                    const files = await listFiles(
                        `Cartridges/${activeCodeVersion}/${cartridge}/cartridge/experience/pages`,
                    );
                    pageFiles = pageFiles.concat(
                        files
                            .map((f) => f.name)
                            .filter((f) => f.endsWith(".json")),
                    );
                } catch (e) {
                    console.warn(`No pages found for cartridge ${cartridge}`);
                }
            }
            return pageFiles;
        },
        enabled: !!cartridges && !!activeCodeVersion,
    });
}

export function useExperienceComponents() {
    const { data: cartridges } = useSiteCartridges();
    const { data: activeCodeVersion } = useActiveCodeVersion();

    return useQuery<ExperienceComponent[]>({
        queryKey: ["experience", "components"],
        queryFn: async () => {
            var componentFiles: ExperienceComponent[] = [];
            // TODO: we can speed this up
            for (const cartridge of cartridges) {
                try {
                    const files = await listFiles(
                        `Cartridges/${activeCodeVersion}/${cartridge}/cartridge/experience/components`,
                    );
                    const componentGroups = files
                        .filter((f) => f.isFolder)
                        .map((f) => f.name);

                    for (const cg of componentGroups) {
                        try {
                            const cgFiles = (
                                await listFiles(
                                    `Cartridges/${activeCodeVersion}/${cartridge}/cartridge/experience/components/${cg}`,
                                )
                            ).filter(
                                (f) => f.isFile && f.name.endsWith(".json"),
                            );

                            for (const cgFile of cgFiles) {
                                // TODO we cannot access the file through webdav at this point
                                // must use a controller to enumerate the modules and return the metadata
                                // this will be faster in any case
                                componentFiles.push({
                                    name: cgFile.name,
                                    typeId: `${cg}.${cgFile.name.replace(".json", "")}`,
                                    description: "",
                                    attributes: [],
                                    regions: [],
                                });
                            }
                        } catch (e) {
                            console.warn(
                                `No components found for group ${cg} in cartridge ${cartridge}`,
                            );
                        }
                    }
                } catch (e) {
                    console.warn(`No pages found for cartridge ${cartridge}`);
                }
            }
            return componentFiles;
        },
        enabled: !!cartridges && !!activeCodeVersion,
    });
}

// These are constants allow lists here but in practice
// this should be configurable
const AVAILABLE_COMPONENTS = [
    "headless.banner",
    "headless.grid",
    "headless.productTile",
    "headless.carousel",
];

// TODO: we're assuming a "main" region for simplicity (and one page type) but we'll need to describe
// page's and their regions eventually
const AVAILABLE_PAGES = ["page.headlessPage"];

const EXPERIENCE_PROMPT_PREAMBLE = `You are an assistant that creates pages for an ecommerce website using a domain specific language (DSL) given natural language instructions.

An example DSL output that contains a banner and a grid of product tiles with another banner in the middle:
<Page type="page.headlessPage">
    <Region id="main">
        <Component type="headless.banner">
            <Attribute id="image">/images/homepage/home-banner-01-1905-800.jpg</Attribute>
            <Attribute id="text">Welcome to our store!</Attribute>
            <Attribute id="buttonText">Click Here</Attribute>
            <Attribute id="buttonLink" kind="product">1234</Attribute>
        </Component>
        <Component type="headless.grid">
            <Attribute id="mobileColumns">1</Attribute>
            <Attribute id="tabletColumns">2</Attribute>
            <Attribute id="desktopColumns">3</Attribute>
            <Attribute id="spacing">3</Attribute>
            <Region id="main">
                <Component type="headless.productTile">
                    <Attribute id="product">5678</Attribute>
                </Component>
                <Component type="headless.banner">
                    <Attribute id="image">/images/homepage/home-banner-01-1905-800.jpg</Attribute>
                    <Attribute id="text">Shop Today</Attribute>
                    <Attribute id="buttonText">Click Here</Attribute>
                    <Attribute id="buttonLink" kind="category">shoes</Attribute>
                </Component>
                <Component type="headless.productTile">
                    <Attribute id="product">9012</Attribute>
                </Component>
            </Region>
        </Component>
    </Region>
</Page>

For all images use /images/homepage/home-banner-01-1905-800.jpg as the default placeholder unless specified otherwise

Component types are defined by the following attributes and regions. Regions can container other components but only if a component has a valid region.

Available component types are:
`;
const EXPERIENCE_PROMPT_POSTAMBLE = `

Only output the XML for the complete page given the request and requirements. Use only available components and attributes. Only output raw XML and always output the entire page:
My request: `;

interface ExperienceAttribute {
    id: string;
    name: string;
    type: string;
    required: boolean;
    default_value?: string;
    values?: string[];
}

interface ExperienceRegion {
    id: string;
    name: string;
}

interface ExperienceComponents {
    id: string;
    name: string;
    description: string;
    attributes?: ExperienceAttribute[];
    regions?: ExperienceRegion[];
}

function generateComponentTypePrompt(components: ExperienceComponents[]) {
    var componentTypePrompt = [];
    for (const component of components) {
        const componentId = component.id;
        const attributes = component.attributes;
        const regions = component.regions;
        const description = component.description;
        const attributePrompt = attributes
            .map((a) => {
                return `    - id: ${a.id} name: ${a.name} (type: ${a.type}) ${a.values ? `(values: ${a.values.join(",")})` : ""}`;
            })
            .join("\n");
        componentTypePrompt.push(
            `- typeId: ${componentId} (description: ${description}) ${regions?.length ? `(regions: ${regions.map((r) => r.id).join(",")})` : ""}\n` +
                (attributes ? `  - attributes:\n` + attributePrompt : ""),
        );
    }
    return componentTypePrompt.join("\n");
}

/**
 * Generate experience prompt from available components and (future) pages
 */
export function useExperiencePrompt(currentPage: string | null) {
    // Todo extract the component info query
    return useQuery({
        queryKey: ["componentInfo", AVAILABLE_COMPONENTS, currentPage],
        queryFn: async () => {
            const resp = await componentInfo.post("", {
                componentTypeIds: AVAILABLE_COMPONENTS,
            });

            // @type {Record<string, any>}
            var components = resp.data.components as Record<
                string,
                APIExperienceComponent
            >;

            var promptText = EXPERIENCE_PROMPT_PREAMBLE;

            console.log("components", components);

            const componentTypes: ExperienceComponents[] = [];
            for (const componentId in components) {
                const component = components[componentId];
                const attributes = component.attribute_definition_groups
                    ?.reduce((acc, adg) => {
                        return acc.concat(adg.attribute_definitions);
                    }, [])
                    .filter((a: any) => a.type !== "custom");
                const regions = component.region_definitions?.map((r: any) => {
                    return {
                        id: r.id,
                        name: r.name,
                    };
                });
                console.log("component", componentId, attributes);
                componentTypes.push({
                    id: componentId,
                    name: component.name,
                    description: component.description,
                    regions,
                    attributes,
                });
            }
            promptText += generateComponentTypePrompt(componentTypes);

            // collect available components, load their attributes and generate the middle of the prompt
            if (currentPage) {
                promptText +=
                    `Here is the existing page. Instead of creating a new page modify this XML with the users request. Be sure to maintain any components unless the user requests to remove them. Keep existing id attributes but do not add new ids for new components.` +
                    `${currentPage}\n`;
            }

            promptText += EXPERIENCE_PROMPT_POSTAMBLE;

            console.log("promptText", promptText);
            return {
                promptText,
                componentTypes,
            };
        },
    });
}

/*
 * Example XML Result from EGPT Requst
 *
 <Page type="page.headlessPage">
    <Region id="main">
        <Component type="headless.carousel">
            <Region id="slides">
                <Component type="headless.banner">
                    <Attribute id="image">https://placehold.it/800x300</Attribute>
                    <Attribute id="text">Banner 1 - Left Justified</Attribute>
                    <Attribute id="buttonText">Click Here</Attribute>
                    <Attribute id="buttonLink" kind="product">1234</Attribute>
                    <Attribute id="position">left</Attribute>
                </Component>
                <Component type="headless.banner">
                    <Attribute id="image">https://placehold.it/800x300</Attribute>
                    <Attribute id="text">Banner 2 - Center Justified</Attribute>
                    <Attribute id="buttonText">Click Here</Attribute>
                    <Attribute id="buttonLink" kind="product">5678</Attribute>
                    <Attribute id="position">center</Attribute>
                </Component>
                <Component type="headless.banner">
                    <Attribute id="image">https://placehold.it/800x300</Attribute>
                    <Attribute id="text">Banner 3 - Right Justified</Attribute>
                    <Attribute id="buttonText">Click Here</Attribute>
                    <Attribute id="buttonLink" kind="product">9012</Attribute>
                    <Attribute id="position">right</Attribute>
                </Component>
            </Region>
        </Component>
        <Component type="headless.grid">
            <Attribute id="mobileColumns">1</Attribute>
            <Attribute id="tabletColumns">3</Attribute>
            <Attribute id="desktopColumns">3</Attribute>
            <Attribute id="spacing">3</Attribute>
            <Region id="main">
                <Component type="headless.productTile">
                    <Attribute id="product">1234</Attribute>
                </Component>
                <Component type="headless.productTile">
                    <Attribute id="product">5678</Attribute>
                </Component>
                <Component type="headless.productTile">
                    <Attribute id="product">9012</Attribute>
                </Component>
            </Region>
        </Component>
    </Region>
</Page>
 */

export async function createExperiencePage(
    pageId: string | null,
    prompt: string,
    componentTypes: ExperienceComponents[],
) {
    const generationsResult = await egptSystemGenerationsRequest(prompt, {
        model: "llmgateway__OpenAIGPT4Omni",
    });

    var generationsResp = decodeEGPTOutput(
        generationsResult.generations[0].text,
    );

    if (!pageId) {
        pageId = "generated-page-" + uuid4().replace(/-/g, "").substring(0, 8);
    }

    var libraryXml = await dslToLibrary(
        pageId,
        generationsResp,
        componentTypes,
    );

    // TODO hardcoded library id
    var libraryId = "NTO-SiteSharedLibrary";
    var importFilename =
        "library-" + pageId + uuid4().replace(/-/g, "").substring(0, 8);
    await createImpexZipFile(`${importFilename}.zip`, {
        [`libraries/${libraryId}/library.xml`]: libraryXml,
    });
    await siteArchiveImport(`${importFilename}.zip`);

    // return page id, result
    return {
        pageId,
        result: generationsResp,
        libraryXml,
    };
}

/**
 * Convert to page designer XML recursively
 *
 * @param item
 * @param content
 * @return {string} content id of this item
 */
function pageToContent(
    item: any,
    content: string[],
    componentTypes: ExperienceComponents[],
    pageId = null,
): string {
    var contentId = item.$.id;
    if (!contentId) {
        contentId = uuid4().replace(/-/g, "");
    }
    if (pageId) {
        contentId = pageId;
    }
    var contentType = item.$.type;
    if (!contentType.startsWith("page.")) {
        contentType = "component." + contentType;
    }

    var regions = [];
    if (item.Region) {
        // enumerate components in region(s)
        regions = regions.concat(
            item.Region.map((region) => {
                var regionId = region.$.id;
                var regionContent = [];
                var ids = region.Component.map((component) => {
                    return pageToContent(component, content, componentTypes);
                });
                return ids
                    .map((id, idx) => {
                        return `<content-link content-id="${id}" type="${contentType}.${regionId}">
            <position>${idx.toFixed(1)}</position>
      </content-link>`;
                    })
                    .join("\n");
            }),
        );
    }

    const component = componentTypes.find((c) => c.id === item.$.type);

    const data = {};
    if (item.Attribute) {
        item.Attribute.forEach((attr) => {
            const attributeId = attr.$.id;
            const attributeDef = component.attributes.find(
                (a) => a.id === attributeId,
            );

            // TODO more robust attribute type conversion
            if (attributeDef.type === "image") {
                data[attributeId] = {
                    path: attr._,
                    focal_point: {
                        x: 0.5,
                        y: 0.5,
                    },
                    meta_data: {
                        height: 400,
                        width: 900,
                    },
                };
            } else if (attributeDef.type === "link") {
                const linkKind = attr.$.kind;
                if (linkKind === "product") {
                    data[attributeId] =
                        `$url('Product-Show', 'pid', '${attr._}')$`;
                } else if (linkKind === "category") {
                    data[attributeId] =
                        `$url('Search-Show', 'cgid', '${attr._}')$`;
                } else {
                    data[attributeId] = `${attr._}`;
                }
            } else {
                data[attributeId] = attr._;
            }
        });
    }

    content.push(`<content content-id="${contentId}">
    <type>${contentType}</type>
    <config>{
  "visibility" : [ ]
    }</config>
    <data xml:lang="x-default">${JSON.stringify(data)}</data>
    <online-flag>true</online-flag>
    <online-flag site-id="NTOManaged">true</online-flag>
    <content-links>
    ${regions.join("\n")}
    </content-links>
</content>`);

    return contentId;
}

async function dslToLibrary(
    pageId: string,
    dsl: string,
    componentTypes: ExperienceComponents[],
) {
    // parse dsl
    // generate library
    // return library
    var result = await xml2js.parseStringPromise(dsl);
    const page = result.Page;
    console.log("Page", page);

    var content = [];
    pageToContent(page, content, componentTypes, pageId);

    // TODO need to validate XML in both directions

    // TODO this library needs to match the site library
    var pageXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<library xmlns="http://www.demandware.com/xml/impex/library/2006-10-31" library-id="NTO-SiteSharedLibrary">
${content.join("\n")}
</library>
    `;

    console.log(pageXml);

    return pageXml;
}
