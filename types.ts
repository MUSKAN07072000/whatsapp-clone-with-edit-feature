export interface User {
  id: number;
  name: string;
  avatar: string;
  about: string;
}

export interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
  reactions: { [emoji: string]: number[] }; // emoji -> list of user ids
}

export interface Chat {
  id: string;
  type: 'private' | 'group';
  participants: number[];
  name?: string; // for groups
  avatar?: string; // for groups
  messages: Message[];
}

export enum StatusType {
  Text = 'TEXT',
  Image = 'IMAGE',
}

export interface Status {
  id: number;
  userId: number;
  type: StatusType;
  content: string; // For TEXT, it's the text. For IMAGE, it's the image URL/base64.
  caption?: string;
  backgroundColor?: string; // For text statuses
  timestamp: number; // Use number for easier sorting/filtering
  expiresAt: number;
  music?: string; // e.g., "Artist - Song Title"
}

export enum ActiveTab {
  Profile = 'PROFILE',
  Chats = 'CHATS',
  Status = 'STATUS',
  Settings = 'SETTINGS',
}

export type AppAction =
  | { type: 'SEND_MESSAGE'; payload: { chatId: string; message: Message } }
  | { type: 'TOGGLE_REACTION'; payload: { chatId: string; messageId: number; emoji: string; userId: number } }
  | { type: 'ADD_STATUS'; payload: { status: Status } }
  | { type: 'EDIT_STATUS'; payload: { status: Status } }
  | { type: 'DELETE_STATUS'; payload: { statusId: number } }
  | { type: 'UPDATE_PROFILE'; payload: { name: string; about: string } }
  | { type: 'UPDATE_AVATAR'; payload: { avatar: string } };

export interface AppState {
  users: User[];
  chats: Chat[];
  statuses: Status[];
}