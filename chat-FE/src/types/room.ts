export interface Member {
    id: number;
    username: string;
    fullName: string;
    color: string;
}

export interface MessageSummary {
    id: number;
    content: string;
    createdAt: string;
    userId: number;
    unread: boolean;
}

export interface Channel {
    id: number;
    name: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    unreadMessageCount: string;
    members: Member[];
    messages: MessageSummary[];
}
