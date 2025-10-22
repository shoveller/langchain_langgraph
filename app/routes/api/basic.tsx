import type {ActionFunction} from "react-router";
import {ChatOpenAI} from "@langchain/openai";
import {AIMessage, BaseMessage, HumanMessage, SystemMessage} from "@langchain/core/messages";
import {createUIMessageStreamResponse, type UIMessage} from "ai";
import {toUIMessageStream} from "@ai-sdk/langchain";

type ChatRequest = {
    id: string;
    messages: UIMessage[];
    trigger: string;
}

function toLangchainBaseMessages(uiMessages: UIMessage[]): BaseMessage[] {
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

export const action: ActionFunction = async ({ request }) => {
    const data = await request.json() as ChatRequest

    const llm = new ChatOpenAI({ model: "gpt-4", temperature: 0 });

    const result = await llm.stream(toLangchainBaseMessages(data.messages))

    return createUIMessageStreamResponse({
        stream: toUIMessageStream(result)
    })
}