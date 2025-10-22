import {useChat} from "@ai-sdk/react";
import {Form} from "react-router";
import {DefaultChatTransport} from "ai";

export default function Home() {
    const { messages, status, sendMessage } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chat1',
        }),
    })

    return (
        <>
            {messages.map(message => (
                <div key={message.id}>
                    {message.role === 'user' ? 'User: ' : 'AI: '}
                    {message.parts.map((part, index) =>
                        part.type === 'text' ? <span key={index}>{part.text}</span> : null,
                    )}
                </div>
            ))}

            <Form
                method='post'
                onSubmit={e => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget)
                    const prompt = formData.get('prompt') as string
                    if (prompt.trim()) {
                        sendMessage({ text: prompt });
                        e.currentTarget.reset()
                    }
                }}
            >
                <input
                    name="prompt"
                    disabled={status !== 'ready'}
                    placeholder="기술 사양을 입력하세요"
                    defaultValue="너는 누구니"
                />
                <button type="submit" disabled={status !== 'ready'}>
                    Submit
                </button>
            </Form>
        </>
    );
}
