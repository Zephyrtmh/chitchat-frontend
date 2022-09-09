import { Conversation } from "./conversation.model";

export class User {
    userId?: number;
    username?: string;
    email?: string;
    password?: string;
    conversations?: Conversation[];
}