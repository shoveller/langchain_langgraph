import type {UIMessage} from "ai";

export type ChatRequest = {
    id: string;
    messages: UIMessage[];
    trigger: string;
}