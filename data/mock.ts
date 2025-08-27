
import type { User, Chat, Status } from '../types';
import { StatusType } from '../types';

export const MOCK_USERS: User[] = [
    { id: 1, name: 'You', avatar: 'https://picsum.photos/seed/user1/200', about: 'Frontend Wizard' },
    { id: 2, name: 'Alice', avatar: 'https://picsum.photos/seed/user2/200', about: 'Hey there! I am using WhatsApp.' },
    { id: 3, name: 'Bob', avatar: 'https://picsum.photos/seed/user3/200', about: 'At the movies' },
    { id: 4, name: 'Charlie', avatar: 'https://picsum.photos/seed/user4/200', about: 'Busy' },
    { id: 5, name: 'Design Team', avatar: 'https://picsum.photos/seed/group1/200', about: 'Designing the future' },
];

export const MOCK_CHATS: Chat[] = [
    {
        id: '2',
        type: 'private',
        participants: [1, 2],
        messages: [
            { id: 1, senderId: 2, text: 'Hey, how is the project going?', timestamp: '10:30 AM', reactions: {} },
            { id: 2, senderId: 1, text: 'Pretty good! I just pushed the latest updates.', timestamp: '10:31 AM', reactions: { '👍': [2] } },
        ],
    },
    {
        id: '5',
        type: 'group',
        participants: [1, 3, 4],
        name: 'Design Team',
        avatar: 'https://picsum.photos/seed/group1/200',
        messages: [
            { id: 1, senderId: 3, text: 'Can someone review my latest design?', timestamp: 'Yesterday', reactions: {} },
            { id: 2, senderId: 4, text: 'Looks great, Bob!', timestamp: 'Yesterday', reactions: { '🎉': [3]} },
            { id: 3, senderId: 1, text: 'I will take a look this afternoon.', timestamp: '9:05 AM', reactions: {} },
        ],
    },
    {
        id: '3',
        type: 'private',
        participants: [1, 3],
        messages: [
             { id: 1, senderId: 3, text: 'Lunch tomorrow?', timestamp: 'Yesterday', reactions: {} },
        ],
    },
];

const now = Date.now();
const oneHour = 60 * 60 * 1000;
const twentyFourHours = 24 * oneHour;

export const MOCK_STATUSES: Status[] = [
    {
        id: 1,
        userId: 1,
        type: StatusType.Text,
        content: 'Building a WhatsApp clone!',
        backgroundColor: 'bg-blue-700',
        timestamp: now - oneHour * 2,
        expiresAt: now + twentyFourHours - oneHour * 2,
        caption: 'Almost there!'
    },
    {
        id: 2,
        userId: 2,
        type: StatusType.Image,
        content: 'https://picsum.photos/seed/status2/1080/1920',
        caption: 'Beautiful sunset today!',
        timestamp: now - oneHour * 4,
        expiresAt: now + twentyFourHours - oneHour * 4,
    },
    {
        id: 3,
        userId: 3,
        type: StatusType.Text,
        content: 'Coffee time ☕️',
        backgroundColor: 'bg-amber-700',
        timestamp: now - oneHour * 8,
        expiresAt: now + twentyFourHours - oneHour * 8,
    },
    {
        id: 4,
        userId: 2,
        type: StatusType.Image,
        content: 'https://picsum.photos/seed/status3/1080/1920',
        caption: 'City lights.',
        timestamp: now - oneHour * 3,
        expiresAt: now + twentyFourHours - oneHour * 3,
    },
];
