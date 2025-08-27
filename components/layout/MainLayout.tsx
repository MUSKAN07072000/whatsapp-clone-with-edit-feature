
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatListPanel from '../chat/ChatListPanel';
import StatusPanel from '../status/StatusPanel';
import ProfilePanel from '../profile/ProfilePanel';
import SettingsPanel from '../settings/SettingsPanel';
import { ActiveTab } from '../../types';

const MainLayout: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.Chats);

    const renderActiveTab = () => {
        switch (activeTab) {
            case ActiveTab.Chats:
                return <ChatListPanel />;
            case ActiveTab.Status:
                return <StatusPanel />;
            case ActiveTab.Profile:
                return <ProfilePanel setActiveTab={setActiveTab}/>;
            case ActiveTab.Settings:
                return <SettingsPanel setActiveTab={setActiveTab} />;
            default:
                return <ChatListPanel />;
        }
    };

    return (
        <div className="flex w-full h-full max-w-7xl mx-auto shadow-2xl">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            {renderActiveTab()}
        </div>
    );
};

export default MainLayout;
