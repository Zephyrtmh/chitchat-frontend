import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conversation } from '../models/conversation.model';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { WebsocketConnectionService } from './websocket-connection.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedInUser: User;
  loggedIn: boolean;
  baseUrl: string = "http://localhost:8080/user";
  userConversations: Conversation[];
  constructor(private httpClient: HttpClient) {
    //temp logged in user
    this.loginUser().subscribe(user => {
      this.loggedInUser = user;
    });
  }
  loginUser() {
    this.loggedIn = true;

    return this.httpClient.get<User>(this.baseUrl+"/get/1");
  }

  getUserById(userId) {
    return this.httpClient.get<User>(this.baseUrl + "/get/"+userId);
  }

  
}
