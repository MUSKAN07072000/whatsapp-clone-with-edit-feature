
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ArrowLeft, Edit2, Check } from 'lucide-react';
import { ActiveTab } from '../../types';

interface ProfilePanelProps {
    setActiveTab: (tab: ActiveTab) => void;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({ setActiveTab }) => {
    const { currentUser, dispatch } = useAppContext();
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingAbout, setIsEditingAbout] = useState(false);
    const [name, setName] = useState(currentUser.name);
    const [about, setAbout] = useState(currentUser.about);

    const handleSave = () => {
        dispatch({ type: 'UPDATE_PROFILE', payload: { name, about } });
        setIsEditingName(false);
        setIsEditingAbout(false);
    };

    return (
        <div className="flex flex-col flex-1 h-full bg-wa-dark-100">
            <header className="flex items-center p-4 bg-wa-dark-200 text-wa-dark-text space-x-4">
                <button onClick={() => setActiveTab(ActiveTab.Chats)}><ArrowLeft /></button>
                <h2 className="text-xl font-semibold">Profile</h2>
            </header>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative group">
                        <img src={currentUser.avatar} alt="Profile" className="w-48 h-48 rounded-full shadow-lg" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Edit2 className="text-white w-8 h-8"/>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Edit Name */}
                    <div className="p-4 bg-wa-dark-200 rounded-lg">
                        <label className="text-sm text-wa-light-green">Your Name</label>
                        <div className="flex items-center justify-between mt-1">
                            {isEditingName ? (
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    className="bg-transparent text-wa-dark-text text-lg focus:outline-none w-full" 
                                />
                            ) : (
                                <p className="text-lg text-wa-dark-text">{name}</p>
                            )}
                            <button onClick={() => { isEditingName ? handleSave() : setIsEditingName(true); setIsEditingAbout(false); }}>
                                {isEditingName ? <Check className="w-5 h-5 text-wa-light-green"/> : <Edit2 className="w-5 h-5 text-wa-dark-text-secondary"/>}
                            </button>
                        </div>
                    </div>

                    {/* Edit About */}
                    <div className="p-4 bg-wa-dark-200 rounded-lg">
                        <label className="text-sm text-wa-light-green">About</label>
                        <div className="flex items-center justify-between mt-1">
                            {isEditingAbout ? (
                                <input 
                                    type="text" 
                                    value={about} 
                                    onChange={(e) => setAbout(e.target.value)} 
                                    className="bg-transparent text-wa-dark-text text-lg focus:outline-none w-full"
                                />
                            ) : (
                                <p className="text-lg text-wa-dark-text">{about}</p>
                            )}
                             <button onClick={() => { isEditingAbout ? handleSave() : setIsEditingAbout(true); setIsEditingName(false); }}>
                                {isEditingAbout ? <Check className="w-5 h-5 text-wa-light-green"/> : <Edit2 className="w-5 h-5 text-wa-dark-text-secondary"/>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePanel;
