import type { EGPTGenerationsResponse } from "../api/einsteingpt";
import type { OpenAIModel } from "../api/types";

export interface ChatResponseError {
    success: false;
    error: string;
}

interface JSONSchemaParameters {
    [key: string]: any;
}

interface ToolSchema {
    name: string;
    description: string;
    parameters?: JSONSchemaParameters;
}

// Intent to construct a new planner with tools by key names
// both will be looked up in the registry
export interface PlannerSetup {
    plannerName: string;
    toolNames: string[];
    plannerOptions?: PlannerOptions;
}

export interface ToolAnswerInvocationResult {
    type: "answer";
    answer: object;
}
export interface ToolErrorInvocationResult {
    type: "error";
    error: object;
}

// Tool wishes to defer to a new planner
export interface ToolPlanInvocationResult {
    type: "plan";
    nextPlan: PlannerSetup;
}
// discriminated union to allow tools to respond in different ways
export type ToolInvocationResult =
    | ToolAnswerInvocationResult
    | ToolErrorInvocationResult
    | ToolPlanInvocationResult;

export interface Tool {
    invoke: (context: object, args: any) => Promise<ToolInvocationResult>;
    schema: ToolSchema;
    requiresConfirmation?: (context: object, args: any) => boolean;
}

export interface ChatContext {
    targetLocale: string;
}

export interface PlanStep {
    thought: string;
    action: string;
    actionInput?: any;
    actionOutput?: any;
}

export interface PlanResult {
    question: string;
    success: boolean;
    messages: EGPTGenerationsResponse[];
    steps: PlanStep[];
    finalAnswer?: string;
    plannerName?: string;
    nextPlan?: PlannerSetup;
}

export interface PlannerOptions {
    maxIterations?: number;
    pastPlanResults?: PlanResult[];
    model?: OpenAIModel;
    preamble?: string;
    postamble?: string;
}

export interface Planner {
    executePlan: (query: string, context: object) => Promise<PlanResult>;
}

// planners must implement this constructor to be available in the registry
// and unmarchalled from saved state; tools can use this to defer
// to specialized planners with unique tool sets
export interface ConstructablePlanner {
    new (tools: Tool[], options: PlannerOptions): Planner;
}

export interface PlannerRegistry {
    planners: Record<string, ConstructablePlanner>;
    tools: Record<string, Tool>;
}
