import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import SockJS from 'sockjs-client';
import {over} from 'stompjs';
import { Conversation } from '../models/conversation.model';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { ChatWindowService } from './chat-window.service';
import { ConversationService } from './conversation.service';
import { MessageService } from './message.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class WebsocketConnectionService {
  private socket$;
  private stompClient;
  private user: User;
  private conversationIds: number[];

  

  constructor(private userService: UserService, private conversationService: ConversationService, private chatWindowService: ChatWindowService) {
    this.userService.loginUser().subscribe(user => {
      this.userService.loggedInUser = user;
      this.user = this.userService.loggedInUser;
      this.conversationService.getConversationsByUserId(this.user.userId).subscribe(conversationIds => {
        this.conversationIds = conversationIds;
        this.conversationIds
        console.log(this.conversationIds)
      });
    })
    
  }

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      this.stompClient = over(this.socket$);
      this.stompClient.connect({}, this.onConnected.bind(this), this.onError.bind(this))
    }
  }

  public onConnected(conversationIds) {
    console.log("i am connected yay!")
    for(let conversationId of this.conversationIds) {
      this.stompClient.subscribe(`/chatroom/${conversationId}`, this.onPublicMessageReceived);
    }
    this.stompClient.subscribe(`/chatroom/hello`, this.onPublicMessageReceived);
    // this.stompClient.subscribe(`/chatroom/1`, this.onPublicMessageReceived);
  }

  private onPublicMessageReceived(payload) {
    // let payloadData = JSON.parse(payload.body);
    console.log("received message")
    console.log(payload);
    this.chatWindowService.activeConversation.messages.push(payload);
  }

  private onPrivateMessagedReceived(payload) {
    console.log(payload);
  }

  private onError() {
    console.log("an error has occured trying to connect to websocket")
  }

  private getNewWebSocket(): WebSocketSubject<any> {
    return new SockJS("http://localhost:8080/sockets");
  }

  public sendMessage(message: any) {
    // this.stompClient.sendMessage("message sent")
    console.log("sending message")
    // this.stompClient.send("/app/hello", {}, "hello")
    let url: string = `/app/message`;
    this.stompClient.send(url, {}, JSON.stringify(message))
    console.log("message sent");
    // this.socket$.send("message sent");
  }

  public close() {
    this.socket$.complete();
  }

}
