import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserService } from '../../service/user/user.service';

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
  user;

  hoveredId: number | null = null; // Store hovered campagne ID

  private readonly keycloak = inject(Keycloak);

  constructor(private userService: UserService) {
    this.user = userService.user;
  }

  ngOnInit(): void {
  }

  selectPitch(pitch: any) {
    if((this.isUserPitchOwner(pitch) || this.isUserCampaignOwner)) {
      this.pitchSelected.emit(pitch);
    }
  }

  isUserPitchOwner(pitch: any): boolean {
    if(pitch.ownerId == this.user()?.userId) {
      return true;
    } else {
      return false;
    }
  }

  isNotClickable(pitch: any) {
    return !(this.isUserPitchOwner(pitch) )
  }
}
