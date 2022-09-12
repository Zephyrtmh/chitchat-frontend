import { Injectable } from '@angular/core';
import { catchError, EMPTY, Subject, switchAll, tap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketConnectionService {
  private socket$: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError( e => {throw e}));

  constructor() { }

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      //pipe to use multiple operators in sequence
      const messages = this.socket$.pipe(
        tap({
          error: error => console.log(error),
        }), 
        catchError(_ => EMPTY));
      this.messagesSubject$.next(messages);
    }
  }

  private getNewWebSocket(): WebSocketSubject<any> {
    return webSocket("ws://localhost:8080");
  }

  public sendMessage(message: any) {
    this.socket$.next(message);
  }

  public close() {
    this.socket$.complete();
  }

}
