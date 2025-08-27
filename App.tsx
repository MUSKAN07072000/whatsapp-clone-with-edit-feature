
import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './components/layout/MainLayout';
import UserSelection from './components/auth/UserSelection';
import type { User } from './types';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const handleUserSelect = (user: User) => {
        setCurrentUser(user);
    };

    if (!currentUser) {
        return <UserSelection onUserSelect={handleUserSelect} />;
    }

    return (
        <ThemeProvider>
            <AppProvider currentUser={currentUser}>
                <div className="w-screen h-screen overflow-hidden antialiased text-sm md:text-base">
                    <MainLayout />
                </div>
            </AppProvider>
        </ThemeProvider>
    );
};

export default App;
