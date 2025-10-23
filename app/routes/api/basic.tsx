import type {ActionFunction} from "react-router";
import {ChatOpenAI} from "@langchain/openai";
import {createUIMessageStreamResponse, type UIMessage} from "ai";
import {toUIMessageStream} from "@ai-sdk/langchain";
import toLangchainBaseMessages from "~/utils/toLangchainBaseMessages";
import type {ChatRequest} from "~/utils/types";

export const action: ActionFunction = async ({ request }) => {
    const data = await request.json() as ChatRequest

    const llm = new ChatOpenAI({ model: "gpt-4", temperature: 0 });

    const result = await llm.stream(toLangchainBaseMessages(data.messages))

    return createUIMessageStreamResponse({
        stream: toUIMessageStream(result)
    })
}