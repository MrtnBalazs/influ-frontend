import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-campagne-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './campagne-list.component.html',
  styleUrl: './campagne-list.component.css'
})
export class CampagneListComponent {
  @Input() campaigns: any[] = [];
  @Output() campaignSelected = new EventEmitter<any>();
  
  constructor(){}
  
  selectCampaign(campaign: any) {
    this.campaignSelected.emit(campaign);
  }
}
