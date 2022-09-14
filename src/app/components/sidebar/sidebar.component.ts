import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Conversation } from 'src/app/models/conversation.model';
import { ChatWindowService } from 'src/app/services/chat-window.service';
import { ConversationService } from 'src/app/services/conversation.service';
import { UserService } from 'src/app/services/user.service';
import { WebsocketConnectionService } from 'src/app/services/websocket-connection.service';
import { ChatWindowComponent } from '../chat-window/chat-window.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  conversations: Conversation[];
  searchForm: FormGroup;
  activeConversation: Conversation;
  @Output() activeConversationChange = new EventEmitter<any>();

  constructor(
    private conversationService: ConversationService, 
    private formBuilder:FormBuilder,
    private chatWindowService: ChatWindowService,
    private userService: UserService,
    private websocketConnectionService: WebsocketConnectionService,
    ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchString: []
    })

    this.conversationService.getConversations().subscribe(conversations => {
      this.conversations = conversations;
      this.websocketConnectionService.connect();
    });

    
  }

  onConversationClick(conversation: Conversation) {
    this.activeConversation = conversation;
    this.activeConversationChange.emit(conversation);
    this.chatWindowService.selectConversation(conversation);
  }

}
