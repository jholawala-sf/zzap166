import type { Tool } from "../../types";
import { type ChatResponseError } from "../../types";
import { api as ocapi } from "../../../api/ocapi";
import { getFile, listFiles } from "../../../api/webdav";
import { CONFIG } from "../../../config";

export const getCodeVersion: Tool = {
    invoke: async (context: object, args: any) => {
        try {
            const activeCodeVersion = (
                await ocapi.get("code_versions")
            ).data.data.find((cv: any) => cv.active);
            return {
                type: "answer",
                answer: {
                    codeVersion: activeCodeVersion.id,
                },
            };
        } catch (e) {
            return {
                type: "error",
                error: { message: "Code version lookup failure" },
            };
        }
    },
    schema: {
        name: "technical.GetCodeVersion",
        description: "Get the current active code version",
        parameters: {
            type: "object",
            properties: {},
        },
    },
};

export const reindexSite: Tool = {
    invoke: async (context: object, args: any) => {
        var siteId = CONFIG.currentSite;
        try {
            await ocapi.post(`jobs/ToolkitBrandPostDeploy/executions`, {
                parameters: [
                    {
                        name: "SiteScope",
                        value: JSON.stringify({ named_sites: [siteId] }),
                    },
                ],
            });
            return {
                type: "answer",
                answer: {
                    success: true,
                },
            };
        } catch (e) {
            if (
                e.response &&
                e.response.data &&
                e.response.data.fault &&
                e.response.data.fault.type === "JobAlreadyRunningException"
            ) {
                return {
                    type: "error",
                    error: {
                        success: false,
                        message: "The job is already running",
                    },
                };
            } else {
                return {
                    type: "error",
                    error: {
                        success: false,
                        message: "Unable to reindex site",
                    },
                };
            }
        }
    },
    schema: {
        name: "technical.ReindexSite",
        description: "regenerate the product search index for the current site",
        parameters: {},
    },
};

const stackTraceRe = /[\r\n]+Stack trace <.*?>([\r\n]+.*?){5}/gms;
export const queryErrorLogs: Tool = {
    invoke: async (context: object, args: any) => {
        try {
            const files = await listFiles("Logs/");
            const lastErrorLog = files
                .filter((file) => file.name.startsWith("error-"))
                .sort(
                    (a, b) =>
                        b.lastModified.getTime() - a.lastModified.getTime(),
                )
                .shift();

            const lastCustomErrorLog = files
                .filter((file) => file.name.startsWith("customerror-"))
                .sort(
                    (a, b) =>
                        b.lastModified.getTime() - a.lastModified.getTime(),
                )
                .shift();

            // TODO wrap up these heuristics in a chain of functions
            var logEntries: string[] = [];
            if (lastErrorLog) {
                const lastErrorLogContent = await getFile(
                    `Logs/${lastErrorLog.name}`,
                );

                if (lastErrorLogContent) {
                    let _logEntries = lastErrorLogContent
                        .split(/(?<=^)\[/m)
                        .filter(
                            (entry) =>
                                entry !== "" &&
                                !entry.includes("SystemJobThread"),
                        );
                    _logEntries = _logEntries.map((entry) => {
                        const lines = entry.split("\n");
                        var _entry = lines[0];
                        var stackMatch = stackTraceRe.exec(entry);
                        if (stackMatch) {
                            _entry += `\n${stackMatch[0].trim()}`;
                        }
                        return _entry;
                    });
                    _logEntries = _logEntries.slice(
                        -1 * Math.max(logEntries.length, 3),
                    );
                    logEntries = logEntries.concat(_logEntries);
                }
            }
            if (lastCustomErrorLog) {
                const lastCustomErrorLogContent = await getFile(
                    `Logs/${lastCustomErrorLog.name}`,
                );
                if (lastCustomErrorLogContent) {
                    let _logEntries = lastCustomErrorLogContent
                        .split(/(?<=^)\[/m)
                        .filter(
                            (entry) =>
                                entry !== "" &&
                                !entry.includes("SystemJobThread"),
                        );

                    _logEntries = _logEntries.map((entry) => {
                        const lines = entry.split("\n");
                        var _entry = lines[0];
                        var stackMatch = stackTraceRe.exec(entry);
                        if (stackMatch) {
                            _entry += `\n${stackMatch[0].trim()}`;
                        }
                        return _entry;
                    });
                    // slice the last 3 entries from _logEntries
                    _logEntries = _logEntries.slice(
                        -1 * Math.max(logEntries.length, 3),
                    );
                    logEntries = logEntries.concat(_logEntries);
                }
            }

            logEntries = logEntries.filter(Boolean);

            return {
                type: "answer",
                answer: {
                    success: true,
                    message:
                        "Summarize the most recent error logs. Display only the most relevant portion of the log entry and explain the nature of the error. If possible display the line number and filename of the error",
                    most_recent_error_log_entries: logEntries,
                },
            };
        } catch (e) {
            console.error(e);
            return {
                type: "error",
                error: {
                    success: false,
                    message: "Error querying error logs",
                },
            };
        }
    },
    schema: {
        name: "technical.QueryErrorLogs",
        description:
            "Query the instance error logs to find the most recent errors and diagnose problems. You should summarize the " +
            "most recent log entries and only display the most relevant information from the error log entry and any code context if applicable. Multiple log " +
            "entries for the same error should be combined",
        parameters: {
            type: "object",
            properties: {},
            required: [],
        },
    },
};

export const getCodeFile: Tool = {
    invoke: async (context: object, args: any) => {
        var codeVersion;
        try {
            const activeCodeVersion = (
                await ocapi.get("code_versions")
            ).data.data.find((cv: any) => cv.active);
            codeVersion = activeCodeVersion.id;
        } catch (e) {
            return {
                type: "error",
                error: { message: "Code version lookup failure" },
            };
        }
        const lineNumber = args.lineNumber;

        const file = await getFile(
            `Cartridges/${codeVersion}/${args.filename}`,
        );

        // get a list of lines in file starting at 10 lines above lineNumber (or 0) and 10 lines after (or the last line in the file)
        const lines = file.split("\n");
        const start = Math.max(0, lineNumber - 10);
        const end = Math.min(lines.length, lineNumber + 10);
        const contextLines = lines.slice(start, end);

        return {
            type: "answer",
            answer: {
                success: true,
                message:
                    "If possible output any explained code in a markdown code block",
                filename: args.filename,
                lines: contextLines,
            },
        };
    },
    schema: {
        name: "technical.CodeGetFileContext",
        description:
            "get context around a line from a file from the code version",
        parameters: {
            type: "object",
            properties: {
                filename: {
                    type: "string",
                    description: "The filename to get",
                },
                lineNumber: {
                    type: "number",
                    description:
                        "The line number to retrieve context from; a max of 10 lines above and below will be returned",
                },
            },
            required: ["filename", "lineNumber"],
        },
    },
};

export const debugInstance: Tool = {
    invoke: async (context: unknown, args: any) => {
        return {
            type: "plan",
            nextPlan: {
                plannerName: "planners.Stepwise.Default",
                toolNames: [
                    "technical.QueryErrorLogs",
                    "technical.GetCodeFile",
                ],
                plannerOptions: {
                    preamble:
                        "Use the tools available to investigate the logs and code",
                    postamble:
                        "Output any relevant code lines in markdown code blocks for context.",
                },
            },
        };
    },
    schema: {
        name: "technical.DebugInstance",
        description:
            "debug this instance/sandbox by querying for errors and analyzing code",
        parameters: {
            type: "object",
            properties: {},
        },
    },
};
