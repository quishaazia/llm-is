'use client'
import React, { useContext, useState } from 'react'
import { Send } from 'lucide-react'
import { ChatContext, Message, MessageType } from '@/app/context/ChatContext'

const ChatInput = () => {
    const { messages, setMessages, setFetchingResponse, fetchingResponse} = useContext(ChatContext)
    const [message, setMessage] = useState('')
    const [response, setResponse] = useState<string[]>([]);

    const sendMessage = () => {
        if (message === '') return
        if(fetchingResponse) return
        setMessages((prev) => [...prev, { message: message, type: MessageType.user, id: Math.random().toString() }])
        fetchResponse()

        setMessage('')
    }
    const fetchResponse = async () => {
        setFetchingResponse(true)
        const res = await fetch("/api/v1/prompt-non-stream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: message }), // Wrap prompt in an object
        });
        if (!res.ok || res.body === null) {
            console.log("Error fetching response");
            return;
        }
        const data = await res.json();
        if(data.message){
            setMessages((prev) => [...prev, { message: data.message, type: MessageType.bot, id: Math.random().toString() }])
        }
        setFetchingResponse(false)

    }
    return (
        <div className="p-5 rounded-xl">
            <div className='flex h-[10vh] w-full justify-self-end shadow-xl rounded-md bg-pink-200 relative '>
            <textarea 
                className='bg-inherit h-full w-full rounded-md resize-none p-3' 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder='Ask here...' 
                onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
                }}
            />
            <button title='send' onClick={sendMessage} className='w-10 h-10 rounded-full absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-barbiePink text-white'>
                <Send />
            </button>
            </div>
        </div>
    )
}

export default ChatInput
