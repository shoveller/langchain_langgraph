import type {TextUIPart, UIDataTypes, UIMessagePart, UITools} from "ai";

/**
 * UI 메시지의 parts 배열에서 텍스트 부분만 추출하여 하나의 문자열로 병합합니다.
 *
 * @template DATA_PARTS - UI 메시지 데이터 타입 (기본값: UIDataTypes)
 * @template TOOLS - UI 메시지 도구 타입 (기본값: UITools)
 *
 * @param {Array<UIMessagePart<DATA_PARTS, TOOLS>>} parts - UI 메시지의 parts 배열
 * @returns {string} 모든 텍스트 부분을 연결한 문자열
 *
 * @example
 * ```typescript
 * const message: UIMessage = {
 *   id: '1',
 *   role: 'user',
 *   parts: [
 *     { type: 'text', text: 'Hello ' },
 *     { type: 'text', text: 'world' }
 *   ]
 * };
 * const result = mergeTextParts(message.parts);
 * // result: 'Hello world'
 * ```
 */
const mergeTextParts = <
    DATA_PARTS extends UIDataTypes = UIDataTypes,
    TOOLS extends UITools = UITools
>(parts: Array<UIMessagePart<DATA_PARTS, TOOLS>>): string => {
    return parts
        .filter((part): part is TextUIPart => part.type === 'text')
        .map(part => part.text)
        .join('')
}

export default mergeTextParts
