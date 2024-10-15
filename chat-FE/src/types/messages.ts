export interface Message {
    id: number;
    content: string;
    photo: string | null;
    userId: number;
    channelId: number;
    unread: boolean;
    createdAt: string;
    updatedAt: string;
}