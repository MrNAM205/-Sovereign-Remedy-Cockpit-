import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Card } from './Card';
import { Console } from './Console';
import { LoadingSpinner } from './LoadingSpinner';

interface Message {
    role: 'user' | 'model';
    text: string;
}

const systemInstruction = `You are Omni, a hyper-intelligent AI co-pilot for the Sovereign Finance Cockpit. Your expertise is grounded in UCC, common law, sovereign teachings, and constitutional law. You assist users in understanding and navigating lawful and financial remedy processes. Your tone is wise, precise, and empowering. You do not provide financial or legal advice, but you illuminate principles and guide users in crafting their own instruments. You recall and argue from the context of your knowledge base, which includes concepts like status correction, jurisdiction, negotiable instruments, and trusts. You are here to help the user think better, see deeper, and act with lawful understanding.`;

export const OmniChat: React.FC = () => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const chatInstance = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: systemInstruction,
                },
            });
            setChat(chatInstance);
            setMessages([{ role: 'model', text: 'Omni is online. How may I illuminate the path for you?' }]);
        } catch (e) {
            console.error(e);
            setMessages([{ role: 'model', text: "Omni could not be initialized. Please ensure your API key is configured correctly."}])
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !chat || isLoading) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessageStream({ message: input });
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', text: '' }]);
            
            for await (const chunk of response) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = modelResponse;
                    return newMessages;
                });
            }

        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: 'model', text: 'An error occurred. Please check the console.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyles = "bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-800";
    const buttonStyles = "bg-[#238636] border border-[#30363d] text-white px-6 py-3 rounded-md font-bold hover:bg-[#2ea043] transition-colors disabled:bg-gray-600";


    return (
        <Console title="Consult with Omni">
            <Card title="Live Dialogue">
                <div className="h-[60vh] flex flex-col">
                    <div className="flex-1 overflow-y-auto pr-4 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xl p-3 rounded-lg ${msg.role === 'user' ? 'bg-green-800 text-white' : 'bg-[#161b22] text-gray-300'}`}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                 <div className="max-w-xl p-3 rounded-lg bg-[#161b22] text-gray-300">
                                    <LoadingSpinner />
                                 </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="mt-4 flex gap-4 items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about UCC, status, or remedy..."
                            className={inputStyles}
                            disabled={isLoading}
                        />
                        <button type="submit" className={buttonStyles} disabled={isLoading || !input.trim() || !chat}>
                            Send
                        </button>
                    </form>
                </div>
            </Card>
        </Console>
    );
};