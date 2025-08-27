
import React from 'react';
import type { User } from '../../types';
import { MOCK_USERS } from '../../data/mock';

interface UserSelectionProps {
    onUserSelect: (user: User) => void;
}

const UserSelection: React.FC<UserSelectionProps> = ({ onUserSelect }) => {
    const appUsers = MOCK_USERS.filter(u => u.id < 5); // Exclude group

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-wa-dark-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-wa-dark-200 rounded-lg shadow-xl">
                <div>
                    <h2 className="text-3xl font-extrabold text-center text-wa-dark-text">
                        Select a User
                    </h2>
                    <p className="mt-2 text-sm text-center text-wa-dark-text-secondary">
                        Choose a user to start your session.
                    </p>
                </div>
                <div className="space-y-4">
                    {appUsers.map((user) => (
                        <button
                            key={user.id}
                            onClick={() => onUserSelect(user)}
                            className="flex items-center w-full p-4 space-x-4 text-left transition duration-300 bg-wa-dark-300 rounded-lg hover:bg-wa-light-teal group"
                        >
                            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                            <div className="flex-1">
                                <p className="text-lg font-semibold text-wa-dark-text group-hover:text-white">{user.name}</p>
                                <p className="text-sm text-wa-dark-text-secondary group-hover:text-gray-200">{user.about}</p>
                            </div>
                            <svg className="w-6 h-6 text-wa-dark-text-secondary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserSelection;
