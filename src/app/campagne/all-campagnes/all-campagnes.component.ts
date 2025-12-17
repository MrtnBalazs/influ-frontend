import { Component, signal } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { CampagneListComponent } from '../campagne-list/campagne-list.component';
import { CampageComponent } from "../campage/campage.component";
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-all-campagnes',
    imports: [CampagneListComponent, CampageComponent],
    standalone: true,
    templateUrl: './all-campagnes.component.html',
    styleUrl: './all-campagnes.component.css',
    animations: [
        trigger('fadeSlideId', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ]
})
export class AllCampagnesComponent {
  campaigns = signal([]);
  campaignSelected = signal<any | null>(null);

  constructor(private campagneService: CampagneService) {}

  ngOnInit(): void {
    this.campagneService.getAllCampagnes().subscribe({
      next: (response: { campaignList: [] }) => {
        this.campaigns.set(response.campaignList.filter((campaign: any) => campaign.campaignState !== "ABORTED"));
      },
      error: (err) => {
        console.error('Failed to load campaigns: ', err);
      }
    });
  }

  onCampaignSelected(campaign: any) {
    this.campaignSelected.set(campaign.id);
  }
}
