import { Component } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { Input } from '@angular/core';
import { signal } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { PitchListComponent } from '../../pitch/pitch-list/pitch-list.component';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { ButtonBarComponent } from "../../common/button-bar/button-bar.component";
import { Button } from '../../common/button-bar/button';
import { INFLUENCER } from '../../consts';
import { ModalService } from '../../service/modal/modal.service';

@Component({
  selector: 'app-campage',
  standalone: true,
  imports: [CommonModule, PitchListComponent, ButtonBarComponent],
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
  isUserCampaignOwner = false;
  userType = "";
  userEmail = "";
  campaignButtons: Button[] = []

  constructor(private modalService: ModalService, private campagneService: CampagneService, private authenticationService: AuthenticationService) {
  }

  @Input({ transform: (c: any) => c }) 
  set selectedCampaign(value: any) {
    this.rerunAnimation();
    if (value) {
      this.campaignId.set(value);
      this.campagneService.getCampagneById(this.campaignId())
      .subscribe({
        next: (response: { campaign: any }) => {
          this.campaign = response.campaign;
          this.authenticationService.getUser()
          .subscribe(user => {
              if(!user) {
                this.isUserCampaignOwner = false;
              } else {
                this.userType = user.userType;
                this.userEmail = user.email;
                if(user.email == this.campaign.ownerId){
                  this.isUserCampaignOwner = true;
                } else {
                  this.isUserCampaignOwner = false;
                }
              }
              if(this.isUserCampaignOwner) {
                this.campaignButtons = [
                  new Button("Delete campaign", "red", () => {/* TODO delete campaign*/}),
                ]
              } else if (this.userType === INFLUENCER && !this.hasPitchForCampaign(this.userEmail)) {
                this.campaignButtons = [
                  new Button("Create pitch", "green", () => {this.modalService.openCreatePitchModal(this.campaignId())}),
                ]
              } else {
                this.campaignButtons = []
              }
            })
        },
        error: (error) => {
          console.error(error);
          this.campaignId = signal<any | null>(null);
          this.campaign = null;
        }
      });
    }
  }

  hasPitchForCampaign(userEmail: string): boolean {
    for(const pitch of this.campaign.pitchList) {
      if(pitch.ownerId === userEmail){
        return true;
      }
    }
    return false;
  }

  onPitchSelected(pitch: any) {
    this.selectedPitchId.set(pitch.id);
    this.modalService.openPitchModal(pitch.id);
  }


  rerunAnimation() {
    this.animationState = 'hide';
    setTimeout(() => this.animationState = 'show', 150); // quickly reset to rerun
  }
}
