import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conversation } from '../models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = "http://localhost:8080/conversation";

  getConversations() {
    return this.httpClient.get<Conversation[]>(this.baseUrl+"/get/all")
  }
  
}
