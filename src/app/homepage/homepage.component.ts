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
    this.router.navigate(['/campagnes']);
  }

  onJoinClicked() {
    this.keycloak.register();
  }

}
