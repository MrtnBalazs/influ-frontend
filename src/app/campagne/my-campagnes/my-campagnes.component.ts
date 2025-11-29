import { Component, signal } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { CampagneListComponent } from "../campagne-list/campagne-list.component";
import { CampageComponent } from '../campage/campage.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-my-campagnes',
    standalone: true,
    imports: [CampagneListComponent, CampageComponent],
    templateUrl: './my-campagnes.component.html',
    styleUrl: './my-campagnes.component.css',
    animations: [
        trigger('fadeSlideId', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ]
})
export class MyCampagnesComponent {
  campaigns = signal([]);
  campaignSelected = signal<any | null>(null);

  constructor(private campagneService: CampagneService) {}

  ngOnInit(): void {
    this.campagneService.getMyCampagnes().subscribe({
      next: (response: { campaignList: [] }) => {
        console.log("Calling get my campaings")
        this.campaigns.set(response.campaignList);
      },
      error: (err) => {
        console.error('Failed to load user campaigns: ', err);
      }
    });
  }

  onCampaignSelected(campaign: any) {
    this.campaignSelected.set(campaign.id);
  }
}
