
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { StatusType } from '../../types';
import type { Status } from '../../types';
import { generateTextStatus, generateImageStatus } from '../../services/geminiService';
import { X, Type, Image, Send, Wand2, RefreshCw } from 'lucide-react';
import { TEXT_STATUS_BACKGROUNDS } from '../../constants';

interface StatusCreatorProps {
    onClose: () => void;
}

const StatusCreator: React.FC<StatusCreatorProps> = ({ onClose }) => {
    const { currentUser, dispatch } = useAppContext();
    const [statusType, setStatusType] = useState<StatusType>(StatusType.Text);
    const [text, setText] = useState('');
    const [caption, setCaption] = useState('');
    const [bgColor, setBgColor] = useState(TEXT_STATUS_BACKGROUNDS[0]);
    const [image, setImage] = useState<string | null>(null);
    const [aiPrompt, setAiPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const handleGenerateAi = async () => {
        if (!aiPrompt) return;
        setIsLoading(true);
        if (statusType === StatusType.Text) {
            const generatedText = await generateTextStatus(aiPrompt);
            setText(generatedText);
        } else {
            const generatedImage = await generateImageStatus(aiPrompt);
            setImage(generatedImage);
        }
        setIsLoading(false);
    };

    const handleSubmit = () => {
        const now = Date.now();
        const newStatus: Status = {
            id: now,
            userId: currentUser.id,
            type: statusType,
            content: statusType === StatusType.Text ? text : image!,
            caption: caption,
            backgroundColor: statusType === StatusType.Text ? bgColor : undefined,
            timestamp: now,
            expiresAt: now + 24 * 60 * 60 * 1000,
        };
        dispatch({ type: 'ADD_STATUS', payload: { status: newStatus } });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-wa-dark-100 z-50 flex flex-col">
            <header className="flex items-center justify-between p-4 bg-wa-dark-200">
                <button onClick={onClose}><X className="w-6 h-6 text-wa-dark-text" /></button>
                <h2 className="text-xl font-semibold text-wa-dark-text">Create Status</h2>
                <div/>
            </header>
            
            <div className={`flex-1 flex items-center justify-center p-4 ${statusType === StatusType.Text ? bgColor : 'bg-black'}`}>
                {statusType === StatusType.Text ? (
                    <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Type a status" className="w-full bg-transparent text-white text-4xl font-bold text-center resize-none focus:outline-none h-48"/>
                ) : (
                    <div className="w-full max-w-md aspect-[9/16] flex items-center justify-center bg-wa-dark-300 rounded-lg">
                        {image ? <img src={image} className="max-h-full max-w-full object-contain rounded-lg"/> : <p className="text-wa-dark-text-secondary">Select an image</p>}
                    </div>
                )}
            </div>

            {statusType === StatusType.Text && (
                 <div className="flex items-center justify-center p-2 bg-wa-dark-200 gap-2">
                    {TEXT_STATUS_BACKGROUNDS.map(bg => <button key={bg} onClick={() => setBgColor(bg)} className={`w-8 h-8 rounded-full ${bg} border-2 ${bgColor === bg ? 'border-white' : 'border-transparent'}`} />)}
                 </div>
            )}

            <div className="p-4 bg-wa-dark-200 space-y-3">
                <div className="flex items-center gap-2 p-2 bg-wa-dark-300 rounded-lg">
                    <Wand2 className="w-5 h-5 text-wa-light-green"/>
                    <input value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} type="text" placeholder={`Generate a ${statusType.toLowerCase()} with AI...`} className="flex-1 bg-transparent text-wa-dark-text focus:outline-none"/>
                    <button onClick={handleGenerateAi} disabled={isLoading} className="p-2 bg-wa-light-teal rounded-lg text-white disabled:bg-gray-500">
                        {isLoading ? <RefreshCw className="w-5 h-5 animate-spin"/> : 'Generate'}
                    </button>
                </div>
                
                 <input type="text" value={caption} onChange={e => setCaption(e.target.value)} placeholder="Add a caption..." className="w-full bg-wa-dark-300 rounded-full px-4 py-2 text-wa-dark-text focus:outline-none"/>

                 {statusType === StatusType.Image && <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-wa-dark-text file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-wa-light-teal file:text-white hover:file:bg-wa-dark-teal cursor-pointer"/>}

                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                       <button onClick={() => setStatusType(StatusType.Text)} className={`p-2 rounded-lg ${statusType === StatusType.Text ? 'bg-wa-light-teal' : 'bg-wa-dark-300'}`}><Type className="w-6 h-6 text-white"/></button>
                       <button onClick={() => setStatusType(StatusType.Image)} className={`p-2 rounded-lg ${statusType === StatusType.Image ? 'bg-wa-light-teal' : 'bg-wa-dark-300'}`}><Image className="w-6 h-6 text-white"/></button>
                    </div>
                     <button onClick={handleSubmit} className="p-3 rounded-full bg-wa-light-green text-white">
                        <Send className="w-6 h-6"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StatusCreator;
