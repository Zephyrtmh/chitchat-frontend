export class Message {
    messageId?: number;
    fromUserId?: number;
    sentDateTime?: Date;
    messageContent?: string; 
    conversationId?: number;

    constructor(messageId?, fromUserId?, sentDateTime?, messageContent?, conversationId?) {
        this.messageId = messageId;
        this.fromUserId = fromUserId;
        this.sentDateTime = sentDateTime;
        this.messageContent = messageContent;
        this.conversationId = conversationId;
    }
}