import { Component, OnInit } from '@angular/core';
import { CampagneService } from '../service/campagne/campagne.service';
import { MultipleSelectorPopupComponent } from "../common/multiple-selector-popup/multiple-selector-popup.component";
import { CampagneListComponent } from "../campagne/campagne-list/campagne-list.component";
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { KeycloakAuthenticationService } from '../service/authentication/keycloak.authentication.service';

@Component({
    selector: 'app-homepage',
    imports: [MultipleSelectorPopupComponent, CampagneListComponent],
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
  campaigns: any[] = [];

  constructor(private campaignservice: CampagneService, private router: Router, private auth:KeycloakAuthenticationService) {}

  ngOnInit(): void {
    this.campaignservice.getAllCampagnes().subscribe((response: { campaignList: any[] }) => {
      this.campaigns = response.campaignList.slice(0, 3);
    });
  }

  onCampaignClicked() {
    this.auth.test()
     //this.router.navigate(['/campagnes']);
  }

  onJoinClicked() {
    this.auth.logout();
     //this.router.navigate(['/register']);
  }

}
