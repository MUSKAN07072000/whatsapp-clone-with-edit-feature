
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import StatusViewer from './StatusViewer';
import StatusCreator from './StatusCreator';
import type { Status } from '../../types';
import { PlusCircle, Camera } from 'lucide-react';

const StatusPanel: React.FC = () => {
    const { state, currentUser } = useAppContext();
    const [viewingUserId, setViewingUserId] = useState<number | null>(null);
    const [isCreatingStatus, setIsCreatingStatus] = useState(false);

    const myStatuses = state.statuses.filter(s => s.userId === currentUser.id);
    const contactStatuses = state.statuses.filter(s => s.userId !== currentUser.id);
    
    const groupedStatuses: { [userId: number]: Status[] } = contactStatuses.reduce((acc, status) => {
        if (!acc[status.userId]) {
            acc[status.userId] = [];
        }
        acc[status.userId].push(status);
        return acc;
    }, {} as { [userId: number]: Status[] });
    
    const usersWithStatus = Object.keys(groupedStatuses).map(Number);
    
    const handleViewStatus = (userId: number) => {
        setViewingUserId(userId);
    };

    return (
        <div className="flex flex-col flex-1 h-full bg-wa-dark-100">
            <div className="p-4 border-b border-wa-dark-300">
                <h2 className="text-2xl font-semibold text-wa-dark-text">Status</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* My Status */}
                <div className="flex items-center space-x-4 cursor-pointer" onClick={() => handleViewStatus(currentUser.id)}>
                    <div className="relative">
                        <img src={currentUser.avatar} alt="My Avatar" className="w-14 h-14 rounded-full" />
                         <button onClick={(e) => { e.stopPropagation(); setIsCreatingStatus(true); }} className="absolute bottom-0 right-0 bg-wa-light-green text-white rounded-full">
                            <PlusCircle className="w-6 h-6" />
                        </button>
                    </div>
                    <div>
                        <p className="font-semibold text-wa-dark-text">My status</p>
                        <p className="text-sm text-wa-dark-text-secondary">{myStatuses.length > 0 ? `${myStatuses.length} updates` : 'Tap to add status update'}</p>
                    </div>
                </div>

                {/* Recent Updates */}
                <div>
                    <p className="text-sm font-semibold text-wa-dark-text-secondary mb-2">Recent updates</p>
                    {usersWithStatus.map(userId => {
                        const user = state.users.find(u => u.id === userId);
                        if (!user) return null;
                        const userStatuses = groupedStatuses[userId];
                        return (
                            <div key={userId} onClick={() => handleViewStatus(userId)} className="flex items-center space-x-4 p-2 rounded-lg cursor-pointer hover:bg-wa-dark-200">
                                <div className="relative p-0.5 border-2 border-wa-story-unseen rounded-full">
                                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                                </div>
                                <div>
                                    <p className="font-semibold text-wa-dark-text">{user.name}</p>
                                    <p className="text-sm text-wa-dark-text-secondary">{new Date(userStatuses[userStatuses.length - 1].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            {viewingUserId && <StatusViewer userId={viewingUserId} onClose={() => setViewingUserId(null)} />}
            {isCreatingStatus && <StatusCreator onClose={() => setIsCreatingStatus(false)} />}
        </div>
    );
};

export default StatusPanel;
