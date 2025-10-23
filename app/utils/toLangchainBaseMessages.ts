import type {UIMessage} from "ai";
import {AIMessage, BaseMessage, HumanMessage, SystemMessage} from "@langchain/core/messages";

/**
 * AI SDK의 UIMessage 배열을 LangChain의 BaseMessage 배열로 변환합니다.
 *
 * 각 메시지의 role에 따라 적절한 LangChain 메시지 타입으로 변환됩니다:
 * - 'system' -> SystemMessage
 * - 'assistant' -> AIMessage
 * - 'user' -> HumanMessage
 *
 * 메시지의 모든 텍스트 parts를 추출하여 하나의 문자열로 병합합니다.
 *
 * @param {UIMessage[]} uiMessages - AI SDK 형식의 메시지 배열
 * @returns {BaseMessage[]} LangChain 형식으로 변환된 메시지 배열
 *
 * @example
 * ```typescript
 * const uiMessages: UIMessage[] = [
 *   {
 *     id: '1',
 *     role: 'system',
 *     parts: [{ type: 'text', text: 'You are a helpful assistant.' }]
 *   },
 *   {
 *     id: '2',
 *     role: 'user',
 *     parts: [{ type: 'text', text: 'Hello!' }]
 *   },
 *   {
 *     id: '3',
 *     role: 'assistant',
 *     parts: [{ type: 'text', text: 'Hi there!' }]
 *   }
 * ];
 *
 * const messages = toLangchainBaseMessages(uiMessages);
 * // [
 * //   SystemMessage('You are a helpful assistant.'),
 * //   HumanMessage('Hello!'),
 * //   AIMessage('Hi there!')
 * // ]
 * ```
 */
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