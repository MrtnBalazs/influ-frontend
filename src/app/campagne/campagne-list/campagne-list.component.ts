import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-campagne-list',
    imports: [],
    standalone: true,
    templateUrl: './campagne-list.component.html',
    styleUrl: './campagne-list.component.css'
})
export class CampagneListComponent {
  @Input() title: string = "";
  @Input() campaigns: any[] = [];
  @Input() withTitle: boolean = true;
  @Input() clickable: boolean = true;
  @Output() campaignSelected = new EventEmitter<any>();
  selectedItemId: string | null = null;
  constructor(){}
  
  selectCampaign(campaign: any) {
    this.campaignSelected.emit(campaign);
    this.selectedItemId = campaign.id;
  }
}
