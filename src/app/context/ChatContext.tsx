'use client'
import { createContext, useState } from "react";

interface ChatContextType {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    fetchingResponse: boolean;
    setFetchingResponse: React.Dispatch<React.SetStateAction<boolean>>;

    
}

export interface Message {
    id: string;
    message: string | string[];
    type: MessageType;
}
export enum MessageType {
    user,
    system,
    bot,
}

export const ChatContext = createContext<ChatContextType>({
    messages: [],
    setMessages: () => { },
    fetchingResponse: false,
    setFetchingResponse: () => { },
});

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [fetchingResponse, setFetchingResponse] = useState<boolean>(false);

    return (
        <ChatContext.Provider
            value={{
                messages,
                setMessages,
                fetchingResponse,
                setFetchingResponse,
            }}>{children}</ChatContext.Provider>);
}

export default ChatContextProvider