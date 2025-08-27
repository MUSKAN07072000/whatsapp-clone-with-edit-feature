
import React, { useRef, useEffect } from 'react';
import type { Chat } from '../../types';
import { useAppContext } from '../../context/AppContext';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

interface ChatWindowProps {
    chat: Chat | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat }) => {
    const { state, currentUser } = useAppContext();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat?.messages]);

    if (!chat) {
        return (
            <div className="flex-1 flex items-center justify-center bg-wa-chat-bg-dark bg-opacity-75">
                <div className="text-center">
                    <img src="https://picsum.photos/seed/whatsapp/300" className="mx-auto rounded-full w-48 h-48 mb-4 border-4 border-wa-dark-300" alt="placeholder"/>
                    <h3 className="text-2xl text-wa-dark-text font-light">Keep your phone connected</h3>
                    <p className="text-wa-dark-text-secondary mt-2">
                        WhatsApp connects to your phone to sync messages.
                    </p>
                </div>
            </div>
        );
    }

    const getChatPartner = () => {
        if (chat.type === 'group') return { name: chat.name, avatar: chat.avatar };
        const partnerId = chat.participants.find(id => id !== currentUser.id);
        return state.users.find(user => user.id === partnerId);
    };
    
    const partner = getChatPartner();

    return (
        <div className="flex flex-col flex-1 h-full bg-wa-chat-bg-dark">
            <header className="flex items-center p-3 bg-wa-dark-200 border-b border-wa-dark-300">
                <img src={partner?.avatar} alt={partner?.name} className="w-10 h-10 mr-4 rounded-full" />
                <div>
                    <h3 className="font-semibold text-wa-dark-text">{partner?.name}</h3>
                    <p className="text-xs text-wa-dark-text-secondary">Online</p>
                </div>
            </header>
            <main className="flex-1 p-6 overflow-y-auto space-y-4">
                {chat.messages.map(message => (
                    <MessageBubble key={message.id} message={message} chatId={chat.id} />
                ))}
                <div ref={messagesEndRef} />
            </main>
            <MessageInput chatId={chat.id} />
        </div>
    );
};

export default ChatWindow;
