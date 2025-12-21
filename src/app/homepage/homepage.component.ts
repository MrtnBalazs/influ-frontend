import { Component, OnInit, inject, signal } from '@angular/core';
import { CampagneService } from '../service/campagne/campagne.service';
import { CampagneListComponent } from "../campagne/campagne-list/campagne-list.component";
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
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
  constructor(private campaignservice: CampagneService, private router: Router) {}

  ngOnInit(): void {
    this.campaignservice.getAllCampagnes().subscribe((response: { campaignList: any[] }) => {
      this.campaigns.set(response.campaignList.filter((campaign: any) => campaign.campaignState === "PENDING" || campaign.campaignState === "SELECTED").slice(0, 3));
    });
  }

  onCampaignClicked() {
    if(this.keycloak.token) {
      //const ws = new WebSocket("ws://localhost:8081/ws/chat", ["Bearer", this.keycloak.token]);
      console.log(this.keycloak.token)
      //const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3US1zSjQ0THhtRlV4VXpSV2VwZlJCVVRaVEhjSzlVNWh2NFhOLS1neVZZIn0.eyJleHAiOjE3NjYxNTI5ODEsImlhdCI6MTc2NjE1MjY4MSwiYXV0aF90aW1lIjoxNzY2MTUyNDU0LCJqdGkiOiJvbnJ0YWM6YzJlZGMxNGEtOTY0ZC00ODMyLWZiOTEtNWNmMDBhODIwMjJmIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTAwL2F1dGgvcmVhbG1zL2luZmx1LXJlYWxtIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6Ijk3ZjE3NDc4LTI0NmItNDcwZi1iMTIyLWVkZmVjNzNmODI5ZCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImluZmx1LWZyb250ZW5kIiwic2lkIjoiMjM4OWI4ZjQtMzg1Ny1iY2Y1LThiMGEtZTZiMDRlODAwNzgxIiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjQyMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtaW5mbHUtcmVhbG0iLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiaW5mbHUtZnJvbnRlbmQiOnsicm9sZXMiOlsidXNlciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiMzMxIiwiZW1haWwiOiIxMTFAMTMzIn0.bVkY0ie-srwQsrvxXB7fcmTLIsfgxkC_HpqlNQuxke-28dOmILZe9ktO-sJnga9gSAkXyLaABkGc1XN0bWJy7jBye6s_BRfMzR0dYN64GZaABOCpypIDI-A-tSk0rcSQPdDEh3trPL9-FF6tIZqpG4k5jp4aS-90ln_LEIDuBpKfF57PeaI2kdqgl-bU0cfHWRkmnMnH0HAuVfl3B4xjAeDk0X2jD616AvHwU5LNy_z3NRjKnXoobEH8kZb1j0S5TEoktxOFWT1jr5QMWBWn4BcRgN6snC4_aIq5aNTyxH7K2wvFjyFq-05bPxd9KrrvWldAYN0LhBDLhDcxcE84wQ"
      const ws = new WebSocket("ws://localhost:8081/ws/chat?token=Bearer " + this.keycloak.token);

      ws.onopen = () => ws.send("Hello server!");
      ws.onmessage = e => console.log(e.data);
    } else {
      const ws = new WebSocket("ws://localhost:8081/ws/chat?token=Bearer dwadawdwahidwadoj");

      ws.onopen = () => ws.send("Hello server!");
      ws.onmessage = e => console.log(e.data);
    }
    //this.router.navigate(['/campagnes']);
  }

  onJoinClicked() {
    this.keycloak.register();
  }

}
