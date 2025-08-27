import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { StatusType } from '../../types';
import type { Status } from '../../types';
import { X, Save, Music, AtSign } from 'lucide-react';
import { TEXT_STATUS_BACKGROUNDS } from '../../constants';

interface StatusEditorProps {
    statusId: number;
    onClose: () => void;
}

const StatusEditor: React.FC<StatusEditorProps> = ({ statusId, onClose }) => {
    const { state, dispatch } = useAppContext();
    const originalStatus = state.statuses.find(s => s.id === statusId);

    const [text, setText] = useState('');
    const [caption, setCaption] = useState('');
    const [bgColor, setBgColor] = useState(TEXT_STATUS_BACKGROUNDS[0]);
    const [image, setImage] = useState<string | null>(null);
    const [music, setMusic] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (originalStatus) {
            setCaption(originalStatus.caption || '');
            setMusic(originalStatus.music);
            if (originalStatus.type === StatusType.Text) {
                setText(originalStatus.content);
                setBgColor(originalStatus.backgroundColor || TEXT_STATUS_BACKGROUNDS[0]);
            } else {
                setImage(originalStatus.content);
            }
        }
    }, [originalStatus]);

    if (!originalStatus) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleAddMusic = () => {
        const song = window.prompt("Enter song name (e.g., Artist - Title):", music || "");
        if (song !== null) { // Allow clearing the music
            setMusic(song || undefined);
        }
    };

    const handleMention = () => {
        const userToMention = window.prompt("Who do you want to mention?");
        if (userToMention) {
            setCaption(prev => `${prev} @${userToMention}`.trim());
        }
    };

    const handleUpdate = () => {
        const updatedStatus: Status = {
            ...originalStatus,
            content: originalStatus.type === StatusType.Text ? text : image!,
            caption: caption,
            backgroundColor: originalStatus.type === StatusType.Text ? bgColor : undefined,
            music: music,
        };
        dispatch({ type: 'EDIT_STATUS', payload: { status: updatedStatus } });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-wa-dark-100 bg-opacity-95 z-50 flex flex-col">
            <header className="flex items-center justify-between p-4 bg-wa-dark-200">
                <button onClick={onClose}><X className="w-6 h-6 text-wa-dark-text" /></button>
                <h2 className="text-xl font-semibold text-wa-dark-text">Edit Status</h2>
                <button onClick={handleUpdate}><Save className="w-6 h-6 text-wa-light-green"/></button>
            </header>
            
            <div className={`relative flex-1 flex items-center justify-center p-4 ${originalStatus.type === StatusType.Text ? bgColor : 'bg-black'}`}>
                {originalStatus.type === StatusType.Text ? (
                    <textarea value={text} onChange={e => setText(e.target.value)} className="w-full bg-transparent text-white text-4xl font-bold text-center resize-none focus:outline-none h-48"/>
                ) : (
                    <div className="w-full max-w-md aspect-[9/16] flex items-center justify-center bg-wa-dark-300 rounded-lg">
                        {image ? <img src={image} className="max-h-full max-w-full object-contain rounded-lg"/> : <p className="text-wa-dark-text-secondary">Select an image</p>}
                    </div>
                )}

                {music && (
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4/5 p-2 bg-black bg-opacity-60 rounded-lg flex items-center gap-2 text-white text-sm">
                        <Music size={16} />
                        <span className="truncate">{music}</span>
                    </div>
                )}
            </div>

            {originalStatus.type === StatusType.Text && (
                 <div className="flex items-center justify-center p-2 bg-wa-dark-200 gap-2">
                    {TEXT_STATUS_BACKGROUNDS.map(bg => <button key={bg} onClick={() => setBgColor(bg)} className={`w-8 h-8 rounded-full ${bg} border-2 ${bgColor === bg ? 'border-white' : 'border-transparent'}`} />)}
                 </div>
            )}

            <div className="p-4 bg-wa-dark-200 space-y-4">
                <div className="flex items-center gap-4">
                    <button onClick={handleAddMusic} className="flex items-center gap-2 p-2 rounded-lg bg-wa-dark-300 hover:bg-wa-dark-200 text-wa-dark-text-secondary hover:text-wa-dark-text transition-colors">
                        <Music size={20} />
                        <span>{music ? 'Change Music' : 'Add Music'}</span>
                    </button>
                    <button onClick={handleMention} className="flex items-center gap-2 p-2 rounded-lg bg-wa-dark-300 hover:bg-wa-dark-200 text-wa-dark-text-secondary hover:text-wa-dark-text transition-colors">
                        <AtSign size={20} />
                        <span>Mention User</span>
                    </button>
                </div>
                 <input type="text" value={caption} onChange={e => setCaption(e.target.value)} placeholder="Edit caption..." className="w-full bg-wa-dark-300 rounded-full px-4 py-2 text-wa-dark-text focus:outline-none"/>
                 {originalStatus.type === StatusType.Image && <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-wa-dark-text file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-wa-light-teal file:text-white hover:file:bg-wa-dark-teal cursor-pointer"/>}
            </div>
        </div>
    );
};

export default StatusEditor;