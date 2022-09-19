import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import SockJS from 'sockjs-client';
import {over} from 'stompjs';
import { Conversation } from '../models/conversation.model';
import { User } from '../models/user.model';
import { ConversationService } from './conversation.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class WebsocketConnectionService {
  private socket$;
  private stompClient;
  private user: User;
  private conversationIds: number[];

  constructor(private userService: UserService, private conversationService: ConversationService) {
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
    // this.stompClient.subscribe(`/chatroom/1`, this.onPublicMessageReceived);
  }

  private onPublicMessageReceived(payload) {
    let payloadData = JSON.parse(payload.body);
    console.log(payload);
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
    this.socket$.next(message);
  }

  public close() {
    this.socket$.complete();
  }

}
