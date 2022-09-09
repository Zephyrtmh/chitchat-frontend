import { Component, Input, OnInit } from '@angular/core';
import { Conversation } from 'src/app/models/conversation.model';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-conversation-preview-card',
  templateUrl: './conversation-preview-card.component.html',
  styleUrls: ['./conversation-preview-card.component.css']
})
export class ConversationPreviewCardComponent implements OnInit {
  @Input()
  conversation: Conversation;
  messages: Message[];
  constructor() { }

  ngOnInit(): void {
    this.messages = this.conversation.messages;
  }

}
