import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { WebsocketConnectionService } from './websocket-connection.service';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient, private websocket: WebsocketConnectionService) { }

  baseUrl: string = "http://localhost:8080/message";

  sendMessage(messageToSend: Message) {
    this.websocket.sendMessage(messageToSend);
    return this.httpClient.put(this.baseUrl+"/add/"+messageToSend.conversationId, messageToSend);
  }
}
