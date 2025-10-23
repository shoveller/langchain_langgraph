import type {UIMessage} from "ai";
import {AIMessage, BaseMessage, HumanMessage, SystemMessage} from "@langchain/core/messages";

export type ChatRequest = {
    id: string;
    messages: UIMessage[];
    trigger: string;
}

export default function toLangchainBaseMessages(uiMessages: UIMessage[]): BaseMessage[] {
    return uiMessages.map(msg => {
        const text = msg.parts
            .filter(part => part.type === 'text')
            .map(part => (part as any).text)
            .join('');

        if (msg.role === 'system') {
            return new SystemMessage(text);
        }

        if (msg.role === 'assistant') {
            return new AIMessage(text);
        }

        return new HumanMessage(text);
    })
}