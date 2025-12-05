import { Component, EventEmitter, Input, OnInit, Output, inject, computed, effect } from '@angular/core';
import { UserService } from '../../service/user/user.service';

@Component({
    selector: 'app-pitch-list',
    imports: [],
    standalone: true,
    templateUrl: './pitch-list.component.html',
    styleUrl: './pitch-list.component.css'
})
export class PitchListComponent{
  @Input() pitches: any[] = [];
  @Input() title = "";
  @Input() withTitle = true;
  @Input() isUserCampaignOwner = false;
  @Input() withRejected = false;
  @Output() pitchSelected = new EventEmitter<any>();
  pitchesWithColor: any[] = [];
  userEmail = "";
  user;

  constructor(private userService: UserService) {
    this.user = userService.user;
  }

  ngOnChanges() {
    if (this.pitches) {
      this.pitchesWithColor = this.pitches.map(p => ({
        ...p,
        color: this.calculateColorByState(p.pitchState, this.isNotClickable(p)),
        notClickable: this.isNotClickable(p)
      }));
      if(!this.withRejected)
        this.pitchesWithColor = this.pitchesWithColor.filter(p => p.pitchState !== "REJECTED");
    }
  }

  calculateColorByState(state: string, isNotClickable: boolean): string{
    if(isNotClickable)
      return "white"
    if(state === "PENDING")
      return "green";
    if(state === "SELECTED")
      return "orange";
    if(state === "ACCEPTED")
      return "blue"
    if(state === "REJECTED")
      return "red"
    if(state === "DONE")
      return "light-blue"
    return "green";
  }

  isUserPitchOwner(pitch: any): boolean {
    if(pitch.ownerId == this.user()?.userId) {
      return true;
    } else {
      return false;
    }
  }

  selectPitch(pitch: any) {
    if((this.isUserPitchOwner(pitch) || this.isUserCampaignOwner)) {
      this.pitchSelected.emit(pitch);
    }
  }

  isNotClickable(pitch: any) {
    return !(this.isUserPitchOwner(pitch) || this.isUserCampaignOwner)
  }
}
