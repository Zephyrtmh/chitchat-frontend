import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ConversationPreviewCardComponent } from './components/conversation-preview-card/conversation-preview-card.component';
import { MessageCardDisplayComponent } from './components/message-card-display/message-card-display.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ChatWindowComponent,
    ConversationPreviewCardComponent,
    MessageCardDisplayComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
