import { Message } from "./message.model";

export class Conversation {
    conversationId?: number;
    conversationName?: string;
    messages?: Message[];
}