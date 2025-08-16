import { Component } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { Input } from '@angular/core';
import { signal } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { PitchListComponent } from '../../pitch/pitch-list/pitch-list.component';
import { AuthenticationService } from '../../service/authentication/authentication.service';

@Component({
  selector: 'app-campage',
  standalone: true,
  imports: [CommonModule, PitchListComponent ],
  templateUrl: './campage.component.html',
  styleUrl: './campage.component.css',
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
export class CampageComponent {
  @Input() id: any = null;
  campaignId = signal<any | null>(null);
  campaign: any = null;
  selectedPitchId = signal<any | null>(null);
  animationState = 'show';
  @Input() withPitches = false;
  clickablePitches = false;

  constructor(private campagneService: CampagneService, private authenticationService: AuthenticationService) {}

  @Input({ transform: (c: any) => c }) 
  set selectedCampaign(value: any) {
    this.rerunAnimation();
    if (value) {
      this.campaignId.set(value);
      this.campagneService.getCampagneById(this.campaignId()).subscribe((response: { campaign: any }) => {
        this.campaign = response.campaign;
        this.authenticationService.getUser().subscribe(user => {
          if(!user) {
            this.clickablePitches = false;
          } else {
            if(user.email == this.campaign.ownerId){
              this.clickablePitches = true;
            } else {
              this.clickablePitches = false;
            }
          }
        })
      });
    }
  }

  onPitchSelected(pitch: any) {
    this.selectedPitchId.set(pitch.id);
  }

  rerunAnimation() {
    this.animationState = 'hide';
    setTimeout(() => this.animationState = 'show', 150); // quickly reset to rerun
  }
}
