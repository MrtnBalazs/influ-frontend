import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-campagne-list',
  standalone: true,
  imports: [],
  templateUrl: './campagne-list.component.html',
  styleUrl: './campagne-list.component.css'
})
export class CampagneListComponent {
  @Input() campaigns: any[] = [];
  @Output() campaignSelected = new EventEmitter<any>();
  selectedItemId: string | null = null;
  constructor(){}
  
  selectCampaign(campaign: any) {
    this.campaignSelected.emit(campaign);
    this.selectedItemId = campaign.id;
  }
}
