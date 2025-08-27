
import React, { useState } from 'react';
import type { Chat } from '../../types';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

const ChatListPanel: React.FC = () => {
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

    return (
        <div className="flex flex-1 w-full h-full bg-wa-dark-100">
            <ChatList onSelectChat={setSelectedChat} selectedChatId={selectedChat?.id} />
            <ChatWindow chat={selectedChat} />
        </div>
    );
};

export default ChatListPanel;
