import type {ActionFunction} from "react-router";
import {ChatOpenAI} from "@langchain/openai";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import {StringOutputParser} from "@langchain/core/output_parsers";
import {RunnableMap} from "@langchain/core/runnables";
import {createUIMessageStreamResponse} from "ai";
import {toUIMessageStream} from "@ai-sdk/langchain";
import mergeTextParts from "~/utils/mergeTextParts";
import type {ChatRequest} from "~/utils/types";

export const action: ActionFunction = async({ request }) => {
    const data = await request.json() as ChatRequest
    const llm = new ChatOpenAI({ model: "gpt-4", temperature: 0 })

    // --- Prompt 1: 정보 추출 ---
    const promptExtract = ChatPromptTemplate.fromTemplate('다음 텍스트에서 기술 사양을 추출하세요:\n\n{textInput}')

    // --- Prompt 2: Transform to JSON ---
    const promptTransform = ChatPromptTemplate.fromTemplate("다음 사양을 'cpu', 'memory', 'storage' 키를 가진 JSON 객체로 변환하세요:\n\n{specifications}")

    // --- Build Chain 1: Extraction Chain ---
    // promptExtract → llm → StringOutputParser
    const extractionChain = promptExtract
        .pipe(llm)
        .pipe(new StringOutputParser())

    // --- Build Chain 2: Full Chain ---
    // 추출 체인의 출력을 promptTransform의 specifications 변수로 전달
    const fullChain = RunnableMap.from({ specifications: extractionChain })
        .pipe(promptTransform)
        .pipe(llm)
        .pipe(new StringOutputParser())

    // data.messages에서 사용자의 마지막 메시지(텍스트 입력) 추출
    const lastMessage = data.messages[data.messages.length - 1]
    const textInput = mergeTextParts(lastMessage.parts)

    // fullChain에 올바른 형식으로 전달: {textInput: '...'}
    const result = await fullChain.stream({ textInput })

    return createUIMessageStreamResponse({
        stream: toUIMessageStream(result)
    })
}