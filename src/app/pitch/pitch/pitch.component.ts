import { Component, Input, signal, inject } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ButtonBarComponent } from "../../common/button-bar/button-bar.component";
import { Button } from '../../common/button-bar/button';
import { combineLatest, map, switchMap} from 'rxjs';
import Keycloak from 'keycloak-js';

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
  pitchId = signal<any | null>(null);
  pitch: any;
  animationState = 'show';
  pitchButtons: Button[] = [];
  isModal = false;
  onClose!: () => void;  // callback passed from service
  private readonly keycloak = inject(Keycloak);

  @Input() 
  set selectedPitch(value: string | null) {
    this.rerunAnimation();
    if (value) {
      this.campagneService.getPitchById(value).pipe(
        switchMap(pitchResponse => {
          const pitch = pitchResponse.pitch;
          return combineLatest({
            user: this.keycloak.loadUserProfile(),
            campaign: this.campagneService.getCampagneById(pitch.campaignId)
          }).pipe(
            map(({ user, campaign }) => {
              return { user, pitch, campaign };
            })
          );
        }),
      ).subscribe({
        next: ({ user, pitch, campaign }) => {
            this.pitch = pitch;
            this.pitchButtons = this.buildButtons(user, pitch, campaign);
          },
          error: (error) => {
          console.error(error);
        }});
    }
  }

  private buildButtons(user: any, pitch: any, campaignRp: any): Button[] {
    if (!user) return [];
    if (user.email === pitch.ownerId) {
      return [new Button("Delete pitch", "red", () => {this.deletePitch(pitch.id)})];
    } else if (user.attributes['userType'] == 'BRAND' && campaignRp.campaign.ownerId === user.email) {
      return [
        new Button("Accept pitch", "green", () => {/* TODO */}),
        new Button("Delete pitch", "red", () => {this.deletePitch(pitch.id)})
      ];
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
        // TODO feedback
      },
      error: (error) => {
        console.error(error);
        // TODO feedback
      }
    });
  }

  
  rerunAnimation() {
    this.animationState = 'hide';
    setTimeout(() => this.animationState = 'show', 150); // quickly reset to rerun
  }

  constructor(private campagneService:CampagneService){}
}
