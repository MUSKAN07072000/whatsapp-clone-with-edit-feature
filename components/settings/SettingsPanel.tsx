
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { ActiveTab } from '../../types';

interface SettingsPanelProps {
    setActiveTab: (tab: ActiveTab) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ setActiveTab }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex flex-col flex-1 h-full bg-wa-dark-100">
            <header className="flex items-center p-4 bg-wa-dark-200 text-wa-dark-text space-x-4">
                <button onClick={() => setActiveTab(ActiveTab.Chats)}><ArrowLeft /></button>
                <h2 className="text-xl font-semibold">Settings</h2>
            </header>

            <div className="flex-1 overflow-y-auto p-8">
                <div className="space-y-6">
                    <div className="p-4 bg-wa-dark-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                             {theme === 'dark' ? <Moon className="text-wa-dark-text-secondary" /> : <Sun className="text-wa-dark-text-secondary" />}
                            <p className="text-lg text-wa-dark-text">Theme</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                             <span className="text-wa-dark-text-secondary text-sm">{theme === 'dark' ? 'Dark' : 'Light'}</span>
                             <button
                                onClick={toggleTheme}
                                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${theme === 'dark' ? 'bg-wa-light-green' : 'bg-gray-400'}`}
                            >
                                <span
                                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;
