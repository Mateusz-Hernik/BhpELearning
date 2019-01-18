export interface Message {
    id: number;
    title: string;
    text: string;
    sender: string;
    sendDate: Date;
    isRead: boolean;
    userId: string;
}
