
import React, { useState } from 'react';
import type { Message } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { Smile } from 'lucide-react';

interface MessageBubbleProps {
    message: Message;
    chatId: string;
}

const EMOJI_REACTIONS = ['👍', '❤️', '😂', '😯', '😢', '🙏'];

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, chatId }) => {
    const { state, currentUser, dispatch } = useAppContext();
    const [showPicker, setShowPicker] = useState(false);
    
    const isSentByCurrentUser = message.senderId === currentUser.id;
    const sender = state.users.find(u => u.id === message.senderId);

    const handleReaction = (emoji: string) => {
        dispatch({ type: 'TOGGLE_REACTION', payload: { chatId, messageId: message.id, emoji, userId: currentUser.id }});
        setShowPicker(false);
    };

    const bubbleClasses = isSentByCurrentUser
        ? 'bg-wa-msg-out-dark self-end text-wa-dark-text'
        : 'bg-wa-msg-in-dark self-start text-wa-dark-text';

    const totalReactions = Object.values(message.reactions).reduce((sum, users) => sum + users.length, 0);

    return (
        <div className={`flex flex-col ${isSentByCurrentUser ? 'items-end' : 'items-start'}`}>
            <div className={`relative group flex items-end max-w-lg p-2 rounded-lg ${bubbleClasses}`}>
                 <div>
                    {!isSentByCurrentUser && sender && (
                        <p className="text-xs font-bold text-wa-light-green mb-1">{sender.name}</p>
                    )}
                    <p className="break-words">{message.text}</p>
                    <span className="text-xs text-wa-dark-text-secondary ml-2 float-right mt-1">{message.timestamp}</span>
                     {totalReactions > 0 && (
                        <div className="absolute -bottom-3 right-2 flex items-center bg-wa-dark-300 rounded-full px-1.5 py-0.5 shadow-md">
                            {Object.entries(message.reactions).map(([emoji, users]) => (
                                <span key={emoji} className="text-xs mr-1">{emoji} {users.length}</span>
                            ))}
                        </div>
                    )}
                </div>
                <div className="absolute top-0 -right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setShowPicker(!showPicker)} className="p-1 rounded-full bg-wa-dark-300 hover:bg-wa-dark-200">
                        <Smile className="w-4 h-4 text-wa-dark-text-secondary"/>
                    </button>
                    {showPicker && (
                        <div className="absolute z-10 right-0 mt-1 flex gap-1 p-1 bg-wa-dark-300 rounded-full">
                            {EMOJI_REACTIONS.map(emoji => (
                                <button key={emoji} onClick={() => handleReaction(emoji)} className="text-lg p-1 hover:scale-125 transition-transform">
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
