
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { SendHorizonal } from 'lucide-react';
import type { Message } from '../../types';

interface MessageInputProps {
    chatId: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ chatId }) => {
    const [text, setText] = useState('');
    const { currentUser, dispatch } = useAppContext();

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() === '') return;

        const newMessage: Message = {
            id: Date.now(),
            senderId: currentUser.id,
            text: text.trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            reactions: {},
        };

        dispatch({ type: 'SEND_MESSAGE', payload: { chatId, message: newMessage } });
        setText('');
    };

    return (
        <form onSubmit={handleSendMessage} className="p-3 bg-wa-dark-200 flex items-center">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message"
                className="flex-1 bg-wa-dark-300 rounded-full px-4 py-2 text-wa-dark-text focus:outline-none"
            />
            <button type="submit" className="ml-3 p-2 rounded-full bg-wa-light-teal text-white hover:bg-wa-dark-teal transition-colors">
                <SendHorizonal className="w-6 h-6" />
            </button>
        </form>
    );
};

export default MessageInput;
