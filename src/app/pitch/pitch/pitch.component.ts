import { Component, Input, OnInit, signal } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ButtonBarComponent } from "../../common/button-bar/button-bar.component";
import { Button } from '../../common/button-bar/button';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { BRAND, INFLUENCER } from '../../consts';
import { combineLatest, forkJoin, map, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pitch',
  standalone: true,
  imports: [ButtonBarComponent],
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

  @Input() 
  set selectedPitch(value: string | null) {
    this.rerunAnimation();
    if (value) {
      this.campagneService.getPitchById(value).pipe(
        switchMap(pitchResponse => {
          const pitch = pitchResponse.pitch;
          return combineLatest({
            user: this.authenticationService.getUser(),
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

  private buildButtons(user: any, pitch: any, campaign: any): Button[] {
    if (!user) return [];
    if (user.email === pitch.ownerId) {
      return [new Button("Delete pitch", "red", () => {/* TODO */})];
    } else if (user.userType === BRAND && campaign.ownerId === user.email) {
      return [
        new Button("Accept pitch", "green", () => {/* TODO */}),
        new Button("Delete pitch", "red", () => {/* TODO */})
      ];
    }
    return [];
  }

  
  rerunAnimation() {
    this.animationState = 'hide';
    setTimeout(() => this.animationState = 'show', 150); // quickly reset to rerun
  }

  constructor(private campagneService:CampagneService, private authenticationService: AuthenticationService){}

}
