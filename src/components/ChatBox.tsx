import React, { useContext } from 'react'
import ChatInput from './ChatInput'
import { ChatContext, MessageType } from '@/app/context/ChatContext'
import { ThreeDots } from 'react-loader-spinner'


const ChatBox = () => {
    const { messages, fetchingResponse } = useContext(ChatContext)
    return (
        <div className='h-[80vh] w-1/2 bg-white rounded-xl shadow-2xl flex flex-col  '>
            <div className='flex justify-center items-center h-12 bg-pink-200 rounded-t-xl py-1 px-4 relative'>
                <div className='absolute left-4 flex gap-2'>
                    <div className='bg-red-500 rounded-full h-4 w-4'></div>
                    <div className='bg-yellow-400 rounded-full h-4 w-4'></div>
                    <div className='bg-green-600 rounded-full h-4 w-4'></div>
                </div>
                <h1 className='text-lg font-bold'>BarbieCHAT</h1>
            </div>
            <div className='h-full overflow-auto '>
                {messages && messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`p-3 ${msg.type === MessageType.bot ? 'bg-barbiePink w-3/4 text-white' : 'bg-pink-200 justify-self-end'} w-fit max-w-full break-words rounded-xl m-2`}
                    >
                        <pre className="whitespace-pre-wrap break-words max-w-full">{msg.message}</pre>
                    </div>
                ))}
                {fetchingResponse &&
                    <div className={`p-3 bg-barbiePink  w-1/3 rounded-xl m-2`}>
                        <ThreeDots color='#FFFFFF' height={50} width={50} />
                    </div>}
                {/* Add your chat messages or content here */}
            </div>
            <ChatInput />
        </div>
    )
}

export default ChatBox
