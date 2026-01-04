import { Injectable, inject } from '@angular/core';
import Keycloak from 'keycloak-js';
import { Client } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root',
})
export class ChatSocketService {
  private readonly keycloak = inject(Keycloak);
  private client: Client;

  constructor() {
    var brokerURL = 'ws://localhost:8081/ws/chat';
    if(this.keycloak.token) {
      const token = "Bearer " + this.keycloak.token;
      brokerURL = 'ws://localhost:8081/ws/chat?token=' + token;
    }

    this.client = new Client({
      brokerURL: brokerURL,
      debug: function (str) {
        if(str !== "<<< PONG" && str !== ">>> PING")
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = (frame: any) => {
      console.log("On connect")
    };

    this.client.onStompError = function (frame: any) {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };
  }

  connect() {
    if (!this.client.active) {
      this.client.activate();
    }
  }

  disconnect() {
    if (this.client.active) {
      this.client.deactivate();
    }
  }

  subscribe(source: string, destination: string, cb: (msg: any) => void) {
    return this.client.subscribe(this.createTopic(source, destination), cb);
  }

  publish(destination: string, message: any) {
    this.client.publish({
      destination: '/app/chat.private',
      body: JSON.stringify({
        "to": destination,
        "message": message
      }),
    });
  }

  createTopic(from: string, to: string): string {
    if(from < to) {
      return '/topic/private.' + from + '.' + to;
    } else {
      return '/topic/private.' + to + '.' + from;
    }
  }
}
