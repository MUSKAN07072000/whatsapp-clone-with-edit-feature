import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../../context/AppContext';
import StatusEditor from './StatusEditor';
import { X, MoreVertical, Edit, Trash2, Music } from 'lucide-react';

interface StatusViewerProps {
    userId: number;
    onClose: () => void;
}

const StatusViewer: React.FC<StatusViewerProps> = ({ userId, onClose }) => {
    const { state, currentUser, dispatch } = useAppContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [editingStatusId, setEditingStatusId] = useState<number | null>(null);

    const userStatuses = state.statuses.filter(s => s.userId === userId).sort((a,b) => a.timestamp - b.timestamp);
    const user = state.users.find(u => u.id === userId);

    const isMyStatus = userId === currentUser.id;

    const nextStatus = useCallback(() => {
        if (currentIndex < userStatuses.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onClose();
        }
    }, [currentIndex, userStatuses.length, onClose]);

    useEffect(() => {
        if (isPaused) return;
        const timer = setTimeout(nextStatus, 5000);
        return () => clearTimeout(timer);
    }, [currentIndex, isPaused, nextStatus]);

    if (userStatuses.length === 0) {
        onClose();
        return null;
    }
    
    const currentStatus = userStatuses[currentIndex];

    const handleDelete = () => {
        dispatch({ type: 'DELETE_STATUS', payload: { statusId: currentStatus.id }});
        onClose();
    };
    
    const handleEdit = () => {
        setEditingStatusId(currentStatus.id);
        setShowMenu(false);
        setIsPaused(true);
    };

    if (!user) return null;

    const renderCaptionWithMentions = (text: string) => {
        const parts = text.split(/(@\w+)/g);
        return parts.map((part, index) => {
            if (part.startsWith('@')) {
                return <strong key={index} className="text-blue-400">{part}</strong>;
            }
            return part;
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col justify-center items-center" onMouseDown={() => setIsPaused(true)} onMouseUp={() => setIsPaused(false)}>
            {/* Progress Bars */}
            <div className="absolute top-4 left-4 right-4 flex gap-1">
                {userStatuses.map((_, index) => (
                    <div key={index} className="flex-1 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white transition-all duration-100 ease-linear"
                            style={{ width: `${index < currentIndex ? 100 : index === currentIndex && !isPaused ? 100 : 0}%`, transitionDuration: index === currentIndex && !isPaused ? '5000ms' : '0ms' }}
                        />
                    </div>
                ))}
            </div>

            {/* Header */}
            <div className="absolute top-8 left-4 right-4 flex items-center justify-between text-white z-10">
                <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full"/>
                    <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-300">{new Date(currentStatus.timestamp).toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                     {isMyStatus && (
                        <>
                            <button onClick={handleEdit} aria-label="Edit status" className="p-2 rounded-full hover:bg-white/20 transition-colors">
                                <Edit size={20} />
                            </button>
                            <div className="relative">
                                 <button onClick={() => setShowMenu(s => !s)} aria-label="More options" className="p-2 rounded-full hover:bg-white/20 transition-colors">
                                    <MoreVertical size={20} />
                                </button>
                                {showMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-wa-dark-200 rounded-md shadow-lg z-10 text-wa-dark-text">
                                        <button onClick={handleDelete} className="w-full text-left px-4 py-2 text-sm hover:bg-wa-dark-300 flex items-center gap-2 text-red-500"><Trash2 size={16}/> Delete</button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                    <button onClick={onClose} aria-label="Close viewer" className="p-2 rounded-full hover:bg-white/20 transition-colors">
                        <X size={24} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="relative w-full max-w-md aspect-[9/16] flex items-center justify-center">
                {currentStatus.type === 'IMAGE' ? (
                    <img src={currentStatus.content} alt={currentStatus.caption} className="max-h-full max-w-full object-contain rounded-lg"/>
                ) : (
                    <div className={`w-full h-full flex items-center justify-center text-white text-3xl font-bold p-8 text-center ${currentStatus.backgroundColor}`}>
                        {currentStatus.content}
                    </div>
                )}
                 {currentStatus.music && (
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4/5 p-2 bg-black bg-opacity-60 rounded-lg flex items-center gap-2 text-white text-sm">
                        <Music size={16} />
                        <span className="truncate">{currentStatus.music}</span>
                    </div>
                )}
                 {currentStatus.caption && (
                    <div className="absolute bottom-0 w-full p-4 bg-black bg-opacity-50 text-center text-white">
                        <p>{renderCaptionWithMentions(currentStatus.caption)}</p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <button className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-1/3" onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-1/3" onClick={nextStatus} />

            {editingStatusId && (
                <StatusEditor
                    statusId={editingStatusId}
                    onClose={() => {
                        setEditingStatusId(null);
                        setIsPaused(false);
                    }}
                />
            )}
        </div>
    );
};

export default StatusViewer;