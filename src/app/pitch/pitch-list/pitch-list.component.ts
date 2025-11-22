import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import Keycloak from 'keycloak-js';

@Component({
    selector: 'app-pitch-list',
    imports: [],
    standalone: true,
    templateUrl: './pitch-list.component.html',
    styleUrl: './pitch-list.component.css'
})
export class PitchListComponent implements OnInit{
  @Input() pitches: any[] = [];
  @Input() title = "";
  @Input() withTitle = true;
  @Input() isUserCampaignOwner = false;
  @Output() pitchSelected = new EventEmitter<any>();
  userEmail = "";

  hoveredId: number | null = null; // Store hovered campagne ID

  private readonly keycloak = inject(Keycloak);

  ngOnInit(): void {
    this.keycloak.loadUserProfile().then(user => {
      if(user && user.email) {
        this.userEmail = user.email
      }
    })
  }

  selectPitch(pitch: any) {
    if((this.isUserPitchOwner(pitch) || this.isUserCampaignOwner)) {
      this.pitchSelected.emit(pitch);
    }
  }

  isUserPitchOwner(pitch: any): boolean {
    if(pitch.ownerId == this.userEmail) {
      return true;
    } else {
      return false;
    }
  }

  isNotClickable(pitch: any) {
    return !(this.isUserPitchOwner(pitch) )
  }
}
