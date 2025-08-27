
import React from 'react';
import type { User } from '../../types';
import { ActiveTab } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { MessageCircle, Camera, User as UserIcon, Settings } from 'lucide-react';

interface SidebarProps {
    activeTab: ActiveTab;
    setActiveTab: (tab: ActiveTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const { currentUser } = useAppContext();

    const iconClasses = (tab: ActiveTab) => 
        `w-7 h-7 cursor-pointer transition-colors ${activeTab === tab ? 'text-white' : 'text-wa-dark-text-secondary hover:text-wa-dark-text'}`;

    return (
        <div className="flex flex-col items-center justify-between w-20 p-3 bg-wa-dark-200 border-r border-wa-dark-300">
            <div className="flex flex-col items-center space-y-8">
                 <div className="w-10 h-10 mb-4 cursor-pointer" onClick={() => setActiveTab(ActiveTab.Profile)}>
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full rounded-full"/>
                 </div>
                <MessageCircle className={iconClasses(ActiveTab.Chats)} onClick={() => setActiveTab(ActiveTab.Chats)} />
                <Camera className={iconClasses(ActiveTab.Status)} onClick={() => setActiveTab(ActiveTab.Status)} />
            </div>
            <div className="flex flex-col items-center space-y-6">
                <Settings className={iconClasses(ActiveTab.Settings)} onClick={() => setActiveTab(ActiveTab.Settings)} />
            </div>
        </div>
    );
};

export default Sidebar;
