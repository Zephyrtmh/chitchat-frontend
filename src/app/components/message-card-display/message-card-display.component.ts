import { Component, Input, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-message-card-display',
  templateUrl: './message-card-display.component.html',
  styleUrls: ['./message-card-display.component.css'],
})
export class MessageCardDisplayComponent implements OnInit {
  @Input()
  message: Message;
  messageDateTime;
  messageTime: string;
  messageDate: string;
  fromUser: User;
  isFromLoggedInUser: boolean;
  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserById(this.message.fromUserId).subscribe(user => {
      this.fromUser = user;
      if(user.userId === this.userService.loggedInUser.userId) {
        this.isFromLoggedInUser = true;
      }
      else {
        this.isFromLoggedInUser = false;
      }
    });
    this.messageDateTime = new Date(this.message.sentDateTime);
    console.log(this.messageDateTime);

    this.messageTime = this.messageDateTime.toLocaleTimeString().substring(0,5);
    this.messageDate = this.messageDateTime.toLocaleDateString();
  }

}
