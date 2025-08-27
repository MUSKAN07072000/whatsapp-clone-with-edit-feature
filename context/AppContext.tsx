
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import type { User, AppState, AppAction, Chat, Message, Status } from '../types';
import { MOCK_USERS, MOCK_CHATS, MOCK_STATUSES } from '../data/mock';

const initialState: AppState = {
    users: MOCK_USERS,
    chats: MOCK_CHATS,
    statuses: MOCK_STATUSES,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'SEND_MESSAGE': {
            const { chatId, message } = action.payload;
            return {
                ...state,
                chats: state.chats.map((chat) =>
                    chat.id === chatId ? { ...chat, messages: [...chat.messages, message] } : chat
                ),
            };
        }
        case 'TOGGLE_REACTION': {
            const { chatId, messageId, emoji, userId } = action.payload;
            return {
                ...state,
                chats: state.chats.map((chat) => {
                    if (chat.id !== chatId) return chat;
                    return {
                        ...chat,
                        messages: chat.messages.map((msg) => {
                            if (msg.id !== messageId) return msg;
                            const newReactions = { ...msg.reactions };
                            if (newReactions[emoji]?.includes(userId)) {
                                newReactions[emoji] = newReactions[emoji].filter((id) => id !== userId);
                                if (newReactions[emoji].length === 0) delete newReactions[emoji];
                            } else {
                                newReactions[emoji] = [...(newReactions[emoji] || []), userId];
                            }
                            return { ...msg, reactions: newReactions };
                        }),
                    };
                }),
            };
        }
        case 'ADD_STATUS': {
            return {
                ...state,
                statuses: [...state.statuses, action.payload.status].sort((a, b) => b.timestamp - a.timestamp),
            };
        }
        case 'EDIT_STATUS': {
             return {
                ...state,
                statuses: state.statuses.map(s => s.id === action.payload.status.id ? action.payload.status : s),
            };
        }
        case 'DELETE_STATUS': {
            return {
                ...state,
                statuses: state.statuses.filter(s => s.id !== action.payload.statusId),
            };
        }
        case 'UPDATE_PROFILE': {
            const { name, about } = action.payload;
            // In a real app, this would be the current logged-in user.
            // Here, we find the user by name (assuming unique for mock data).
            // This is a simplification.
            return {
                ...state,
                users: state.users.map(user => 
                    user.id === state.users.find(u => u.name === name)?.id ? { ...user, name, about } : user
                ),
            };
        }
        case 'UPDATE_AVATAR': {
             // This is a placeholder as we can't truly update mock data's source
            return state;
        }
        default:
            return state;
    }
};


interface AppContextType {
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
    currentUser: User;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode; currentUser: User }> = ({ children, currentUser }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch, currentUser }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
