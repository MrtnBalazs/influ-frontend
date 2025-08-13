import { Component, signal } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { CampagneListComponent } from "../campagne-list/campagne-list.component";
import { CampageComponent } from '../campage/campage.component';

@Component({
  selector: 'app-my-campagnes',
  standalone: true,
  imports: [CampagneListComponent, CampageComponent],
  templateUrl: './my-campagnes.component.html',
  styleUrl: './my-campagnes.component.css'
})
export class MyCampagnesComponent {
  campagnes: any[] = [];
    campaignSelected = signal<any | null>(null);
  
    constructor(private campagneService: CampagneService) {}
  
    ngOnInit(): void {
      this.campagneService.getMyCampagnes().subscribe((response: { campaignList: any[] }) => {
        this.campagnes = response.campaignList;
      });
    }
  
    onCampaignSelected(campaign: any) {
      this.campaignSelected.set(campaign.id);
    }
}
