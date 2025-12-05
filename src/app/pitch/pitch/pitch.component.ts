import { Component, Input, signal, inject, output } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ButtonBarComponent } from "../../common/button-bar/button-bar.component";
import { Button } from '../../common/button-bar/button';
import { combineLatest, map, switchMap} from 'rxjs';
import Keycloak from 'keycloak-js';
import { UserService } from '../../service/user/user.service';

@Component({
    selector: 'app-pitch',
    imports: [ButtonBarComponent],
    standalone: true,
    templateUrl: './pitch.component.html',
    styleUrl: './pitch.component.css',
    animations: [
        trigger('fadeSlide', [
            state('hide', style({ opacity: 0, transform: 'translateY(10px)' })),
            state('show', style({ opacity: 1, transform: 'translateY(0)' })),
            transition('hide => show', animate('200ms ease-out')),
            transition('show => hide', animate('150ms ease-in'))
        ])
    ]
})
export class PitchComponent{
  pitchUpdated = output<void>();  // signal-based Output
  pitch: any;
  animationState = 'show';
  pitchButtons: Button[] = [];
  isModal = false;
  onClose!: () => void;  // callback passed from service
  onError!: () => void;  // callback passed from service
  
  constructor(private campagneService:CampagneService, private userService: UserService){}

  @Input() 
  set selectedPitch(value: string | null) {
    this.rerunAnimation();
    if (value) {
      this.campagneService.getPitchById(value).pipe(
        switchMap(pitchResponse => {
          const pitch = pitchResponse.pitch;
          return combineLatest({
            campaign: this.campagneService.getCampagneById(pitch.campaignId)
          }).pipe(
            map(({ campaign }) => {
              return { pitch, campaign };
            })
          );
        }),
      ).subscribe({
        next: ({ pitch, campaign }) => {
            this.pitch = pitch;
            this.pitchButtons = this.buildButtons(this.userService.user(), pitch, campaign);
          },
          error: (error) => {
          console.error(error);
          this.onError();
          this.onClose();
        }});
    }
  }

  private buildButtons(user: any, pitch: any, campaign: any): Button[] {
    console.log(pitch)
    if (!user) return [];
    if (user.userId === pitch.ownerId) {
      return [new Button("Delete pitch", "red", () => {this.deletePitch(pitch.id)})];
    } else if (user.userType == 'BRAND' && campaign.campaign.ownerId === user.userId) {
      if(pitch.pitchState === "PENDING") {
        return [
          new Button("Select pitch", "orange", () => {this.updatePitchState(pitch.id, "SELECTED")}),
          new Button("Reject pitch", "red", () => {this.updatePitchState(pitch.id, "REJECTED")}),
        ];
      }
      if(pitch.pitchState === "SELECTED") {
        return [
          new Button("Accept pitch", "blue", () => {this.updatePitchState(pitch.id, "ACCEPTED")}),
          new Button("Unselect pitch", "green", () => {this.updatePitchState(pitch.id, "PENDING")}),
          new Button("Reject pitch", "red", () => {this.updatePitchState(pitch.id, "REJECTED")}),
        ];
      }
      if(pitch.pitchState === "ACCEPTED") {
        return [
          new Button("Pitch finished", "green", () => {this.updatePitchState(pitch.id, "DONE")})
        ];
      }
    }
    return [];
  }

  private deletePitch(pitchId: string) {
    this.campagneService.deletePitchById(pitchId).subscribe({
      next: () => {
        if(this.isModal) {
          this.onClose();
        }
        this.pitch = null;
        this.selectedPitch = null;
        this.pitchUpdated.emit();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  private updatePitchState(pitchId: string, state: string) {
    this.campagneService.updatePitchState(pitchId, state).subscribe({
      next: () => {
        this.pitchUpdated.emit();
        if(this.isModal) {
          this.onClose();
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  rerunAnimation() {
    this.animationState = 'hide';
    setTimeout(() => this.animationState = 'show', 150); // quickly reset to rerun
  }

}
