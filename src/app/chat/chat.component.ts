import { Component, OnInit, OnDestroy, input } from '@angular/core';
import { ChatSocketService } from '../service/chat-socket/chat-socket.service';
import { ChatMessage } from '../model/chatMessage';

@Component({
  selector: 'app-chat',
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, OnDestroy {
  destination = input.required<string>();
  source = input.required<string>();
  message: any;
  messages: ChatMessage[] = [];
  counter = 1;

  constructor(private chatSocket: ChatSocketService) {}

  ngOnInit() {
    this.chatSocket.connect();
  }

  ngOnDestroy() {
    this.chatSocket.disconnect();
  }

  onSendMessage(msg: string) {
    this.chatSocket.publish(this.destination(), msg)
  }

  onSubscribe() {
    this.chatSocket.subscribe(this.source(), this.destination(), (msg) => {
      var chat = new ChatMessage(msg.body, this.counter++);
      this.messages.push(chat);
    })
  }
}
