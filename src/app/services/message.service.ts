import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = "http://localhost:8080/message";

  sendMessage(messageToSend: Message) {
    return this.httpClient.put(this.baseUrl+"/add/"+messageToSend.conversationId, messageToSend);
  }
}
