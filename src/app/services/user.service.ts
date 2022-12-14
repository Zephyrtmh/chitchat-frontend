import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedInUser: User;
  loggedIn: boolean;
  baseUrl: string = "http://localhost:8080/user";
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
