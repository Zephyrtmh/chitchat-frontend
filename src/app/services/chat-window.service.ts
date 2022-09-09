import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Conversation } from '../models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class ChatWindowService {
  activeConversation: Conversation;
  private subject = new Subject<Conversation>();

  constructor() { }

  selectConversation(conversation: Conversation) {
    this.activeConversation = conversation;
    console.log(this.activeConversation);
    this.subject.next(conversation);
  }

  getActiveConversation() {
    return this.subject.asObservable();
  }
}
