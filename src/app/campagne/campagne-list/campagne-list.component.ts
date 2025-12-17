import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

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
  campaignStateIcon: Record<string, string> = {
    "PENDING": "⏳",
    "PITCH-SELECTED": "⭐",
    "PITCH-ACCEPTED": "✅",
    "DONE": "🏁",
    "ABORTED": "🛑"
  };

  constructor(){}
  
  selectCampaign(campaign: any) {
    this.campaignSelected.emit(campaign);
    this.selectedItemId = campaign.id;
  }
}
