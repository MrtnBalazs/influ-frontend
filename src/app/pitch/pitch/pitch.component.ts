import { Component, Input, OnInit, signal } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ButtonBarComponent } from "../../common/button-bar/button-bar.component";
import { Button } from '../../common/button-bar/button';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { BRAND, INFLUENCER } from '../../consts';

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
        transition('hide => show', [
          animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ]),
        transition('show => hide', [
          animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
        ])
      ])
    ]
})
export class PitchComponent{
  pitchId = signal<any | null>(null);
  pitch: any;
  animationState = 'show';
  pitchButtons: Button[] = [];

  @Input({ transform: (c: any) => c }) 
  set selectedPitch(value: any) {
    this.rerunAnimation();
    if (value) {
      this.pitchId.set(value);
      this.campagneService.getPitchById(this.pitchId()).subscribe((response: { pitch: any }) => {
        this.pitch = response.pitch;
        this.authenticationService.getUser()
        .subscribe(user => {
            if(!user) {
              this.pitchButtons = [];
            } else {
              if(user.email === this.pitch.ownerId) {
                this.pitchButtons = [
                  new Button("Delete pitch", "red", () => {/* TODO delete pitch*/})
                ]
              } else if(user.userType === BRAND){ // TODO ellenőrizni, hogy a kampány owner-e a user
                this.pitchButtons = [
                  new Button("Accept pitch", "green", () => {/* TODO accept pitch*/}),
                  new Button("Delete pitch", "red", () => {/* TODO delete pitch*/})
                ]
              } else {
                this.pitchButtons = [];
              }
            }
          })
      });
    }
  }

  
  rerunAnimation() {
    this.animationState = 'hide';
    setTimeout(() => this.animationState = 'show', 150); // quickly reset to rerun
  }

  constructor(private campagneService:CampagneService, private authenticationService: AuthenticationService){}

}
