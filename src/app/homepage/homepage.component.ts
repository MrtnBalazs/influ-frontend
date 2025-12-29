import { Component, OnInit, inject, signal } from '@angular/core';
import { CampagneService } from '../service/campagne/campagne.service';
import { CampagneListComponent } from "../campagne/campagne-list/campagne-list.component";
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import {Client, Message} from '@stomp/stompjs';
import Keycloak from 'keycloak-js';

@Component({
    selector: 'app-homepage',
    imports: [CampagneListComponent],
    templateUrl: './homepage.component.html',
    standalone: true,
    styleUrl: './homepage.component.css',
    animations: [
        trigger('fadeSlideId', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ]
})
export class HomepageComponent implements OnInit{
  campaigns = signal<any[]>([]);
  private readonly keycloak = inject(Keycloak);
  client: any;
  client2: any;

  constructor(private campaignservice: CampagneService, private router: Router) {
    var token = "token";
    if(this.keycloak.token) {
      token = "Bearer " + this.keycloak.token;
    }
    
    this.client = new Client({
      brokerURL: 'ws://localhost:8081/ws/chat?token=' + token,
      debug: function (str) {
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

    this.client.activate();
  }

  ngOnInit(): void {
    this.campaignservice.getAllCampagnes().subscribe((response: { campaignList: any[] }) => {
      this.campaigns.set(response.campaignList.filter((campaign: any) => campaign.campaignState === "PENDING" || campaign.campaignState === "SELECTED").slice(0, 3));
    });
  }

  ngOnDestroy() {
    this.client.deactivate();
  }

  onCampaignClicked() {
    // There is an option to skip the Content-length header
    this.client.publish({
      destination: '/app/chat.private',
      body: JSON.stringify({
        "to": "111",
        "message": "Hello world"
      }),
    });

    //this.router.navigate(['/campagnes']);
  }

  onJoinClicked() {
    const onMessage = (message: any) => {
      // Called when the client receives a STOMP message from the server
      if (message.body) {
        alert('Got message with body ' + message.body);
      } else {
        alert('Got empty message');
      }
    };

    this.client.subscribe('/user/queue/messages', onMessage);

    //this.keycloak.register();
  }

}
