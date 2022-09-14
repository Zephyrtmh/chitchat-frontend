import { Injectable } from '@angular/core';
import { catchError, EMPTY, Subject, switchAll, tap } from 'rxjs';
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
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError( e => {throw e}));
  private stompClient;
  private user: User;
  private conversationIds: number[];

  constructor(private userService: UserService, private conversationService: ConversationService) {
    this.user = this.userService.loggedInUser;
    
  }

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      this.stompClient = over(this.socket$);
      this.stompClient.connect({}, this.onConnected, this.onError)
    }
  }

  public onConnected() {
    this.conversationService.getConversationsByUserId(this.user.userId).subscribe(conversationIds => {
      this.conversationIds = conversationIds;
      for(let conversationId of this.conversationIds) {
        this.stompClient.subscribe(`/chatroom/${conversationId}`, this.onPublicMessageReceived);
      }
    })
    //get user conversations
    
    
    // let conversationIds: number[];
    // conversations.map((conversation) => {
    //   conversationIds.push(conversation.conversationId);
    // })
    
    
    // this.stompClient.subscribe('/user/'+ this.user.username+"/private", this.onPrivateMessagedReceived);
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
