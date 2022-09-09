import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscriber, Subscription } from 'rxjs';
import { Conversation } from 'src/app/models/conversation.model';
import { Message } from 'src/app/models/message.model';
import { ChatWindowService } from 'src/app/services/chat-window.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  activeConversation: Conversation;
  subscription: Subscription;
  textForm: FormGroup;

  constructor(
    private chatWindowService: ChatWindowService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
  ) {
    this.subscription = this.chatWindowService.getActiveConversation().subscribe(conversation => {
      this.activeConversation = conversation;

      //scroll chat window down
      //get element of last message added
      // let lastMessage = document.getElementById('Id ' + (this.activeConversation.messages.length-2).toString());
      // let topPos = lastMessage.offsetTop;
    })
  }

  ngOnInit(): void {
    this.activeConversation = this.chatWindowService.activeConversation;
    console.log(this.activeConversation)

    if(this.activeConversation) {
      let conversationContainer = document.getElementById("conversation-messages");
      conversationContainer.scrollTop = conversationContainer.scrollHeight;
    }

    this.textForm = this.formBuilder.group({
      textInput: []
    })
  }

  submitText() {
    //create message object and send to backend (fromUserId, datetime, textContent)
    let messageContent = this.textForm.controls['textInput'].value;
    let fromUserId = this.userService.loggedInUser.userId;
    let dateNow = new Date();
    let dateTime =dateNow.toISOString();

    let newMessage: Message = new Message(
      null, 
      this.userService.loggedInUser.userId, 
      dateTime, messageContent, 
      this.activeConversation.conversationId
      );
    this.activeConversation.messages.push(newMessage);
    console.log(dateTime);
    console.log(dateNow.toLocaleTimeString());
    //update frontend with new message

    //reset form
    this.textForm.reset();

    this.messageService.sendMessage(newMessage).subscribe(message=> {
      console.log(message);

      //scroll chat window down
      //get element of last message added
      let lastMessage = document.getElementById('Id ' + (this.activeConversation.messages.length-1).toString());
      let topPos = lastMessage.offsetTop;
      let conversationContainer = document.getElementById("conversation-messages");
      conversationContainer.scrollTop = topPos;
    });
    
    
  }

}
