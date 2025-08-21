import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';

@Component({
  selector: 'app-pitch-list',
  standalone: true,
  imports: [],
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

  constructor(private authenticationService: AuthenticationService){}

  ngOnInit(): void {
    this.authenticationService.getUser()
      .subscribe(user => {
          if(user) {
            this.userEmail = user.email;
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
