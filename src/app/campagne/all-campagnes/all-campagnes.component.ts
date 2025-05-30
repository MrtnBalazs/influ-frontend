import { Component, signal } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { CampagneListComponent } from '../campagne-list/campagne-list.component';
import { CampageComponent } from "../campage/campage.component";

@Component({
  selector: 'app-all-campagnes',
  standalone: true,
  imports: [CampagneListComponent, CampageComponent],
  templateUrl: './all-campagnes.component.html',
  styleUrl: './all-campagnes.component.css'
})
export class AllCampagnesComponent {
  campagnes: any[] = [];
  campaignSelected = signal<any | null>(null);

  constructor(private campagneService: CampagneService) {}

  ngOnInit(): void {
    this.campagneService.getAllCampagnes().subscribe((response: { campaigns: any[] }) => {
      this.campagnes = response.campaigns;
    });
  }

  onCampaignSelected(campaign: any) {
    this.campaignSelected.set(campaign.id);
  }
}
