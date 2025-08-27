
import React from 'react';
import type { Chat } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface ChatListProps {
    onSelectChat: (chat: Chat) => void;
    selectedChatId?: string;
}

const ChatList: React.FC<ChatListProps> = ({ onSelectChat, selectedChatId }) => {
    const { state, currentUser } = useAppContext();
    const { users, chats } = state;

    const getChatPartner = (chat: Chat) => {
        if (chat.type === 'group') return { name: chat.name, avatar: chat.avatar };
        const partnerId = chat.participants.find(id => id !== currentUser.id);
        return users.find(user => user.id === partnerId);
    };

    return (
        <div className="flex flex-col w-full max-w-sm border-r border-wa-dark-300 bg-wa-dark-100">
            <div className="p-4 border-b border-wa-dark-300">
                <h2 className="text-2xl font-semibold text-wa-dark-text">Chats</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                {chats.map(chat => {
                    const partner = getChatPartner(chat);
                    const lastMessage = chat.messages[chat.messages.length - 1];
                    const isSelected = chat.id === selectedChatId;

                    return (
                        <div
                            key={chat.id}
                            onClick={() => onSelectChat(chat)}
                            className={`flex items-center p-3 cursor-pointer transition-colors ${isSelected ? 'bg-wa-dark-300' : 'hover:bg-wa-dark-200'}`}
                        >
                            <img src={partner?.avatar} alt={partner?.name} className="w-12 h-12 mr-4 rounded-full" />
                            <div className="flex-1 overflow-hidden">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold text-wa-dark-text truncate">{partner?.name}</p>
                                    <p className="text-xs text-wa-dark-text-secondary">{lastMessage?.timestamp}</p>
                                </div>
                                <p className="text-sm text-wa-dark-text-secondary truncate">{lastMessage?.text}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChatList;
