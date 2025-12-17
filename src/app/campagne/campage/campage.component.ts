import { Component, inject, OnInit, output, effect } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { Input } from '@angular/core';
import { signal } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { PitchListComponent } from '../../pitch/pitch-list/pitch-list.component';
import { ButtonBarComponent } from "../../common/button-bar/button-bar.component";
import { Button } from '../../common/button-bar/button';
import { BRAND, INFLUENCER } from '../../consts';
import { ModalService } from '../../service/modal/modal.service';
import Keycloak from 'keycloak-js';
import { UserService } from '../../service/user/user.service';
import { PitchComponent } from '../../pitch/pitch/pitch.component';

@Component({
    selector: 'app-campage',
    imports: [CommonModule, PitchListComponent, ButtonBarComponent, PitchComponent],
    standalone: true,
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
  @Input() withPitches = false;
  campaignChanged = output<void>();  // signal-based Output
  campaign: any = null;
  selectedPitchId = signal<any | null>(null);
  animationState = 'show';
  atLeastSelectedPitchStatePitchId = signal<any | null>(null);
  isUserCampaignOwner = false;
  userType: any = "";
  userEmail: any = "";
  campaignButtons: Button[] = []
  pitchRefresh = signal(0);
  // TODO CampaignListComponent nél is ez van használva, kód duplikáció -> kiemelni valamiközösbe
  campaignStateIcon: Record<string, string> = {
    "PENDING": "⏳",
    "PITCH-SELECTED": "⭐",
    "PITCH-ACCEPTED": "✅",
    "DONE": "🏁"
  };
  dealOngoingPitchStates = [
    "SELECTED",
    "ACCEPTED",
    "DONE",
    "ABORTED"
  ]

  constructor(private modalService: ModalService, private campagneService: CampagneService, private userService: UserService) {}

  @Input({ transform: (c: any) => c }) 
  set selectedCampaign(value: any) {
    this.rerunAnimation();
    if (value) {
      this.refreshCampaign(value);
    }
  }

  refreshCampaign(campaignId: any) {
    if(campaignId) {
      this.rerunAnimation();
      this.campagneService.getCampagneById(campaignId)
      .subscribe({
        next: (response: { campaign: any }) => {
          const user = this.userService.user();
          this.campaign = response.campaign;
          this.isUserCampaignOwner = this.campaign.ownerId == user?.userId;
          console.log("Refresh campaign: ", this.campaign)
          console.log("Refresh campaign user: ", user)

          if(this.isUserCampaignOwner &&
            !this.hasCampaignAtLeastAcceptedPitch()
          ) {
            this.campaignButtons = [
                  new Button("Delete campaign", "red", () => {
                    this.campagneService.deleteCampaignById(this.campaign.id).subscribe({
                      next: () => {
                        this.campaign = null;
                        this.selectedPitchId.set(null);
                        this.campaignChanged.emit();
                      },
                      error: (error) => {
                        console.error(error);
                      }
                    });
                  }),
                ]
          } else if (user?.userType == INFLUENCER &&
            !this.hasPitchForCampaign(user.userId) &&
            !this.hasCampaignAtLeastAcceptedPitch()) {
                this.campaignButtons = [
                  new Button("Create pitch", "green", () => {this.modalService.openCreatePitchModal(this.campaign.id, () => this.refreshCampaign(this.campaign?.id))}),
                ]
          } else {
            this.campaignButtons = []
          }
          // TODO nem kell h signal legyen szerintem
          this.atLeastSelectedPitchStatePitchId.set(this.getPitchWithSelectedOrFurtherState(this.campaign));
        },
        error: (error) => {
          console.error(error);
          this.campaign = null;
        }
      });
    }
  }

  getPitchWithSelectedOrFurtherState(campaign: any): string | null {
    var filteredPitchList = campaign.pitchList.filter((pitch: any) => this.dealOngoingPitchStates.includes(pitch.pitchState));
    console.log(filteredPitchList)
    if(filteredPitchList.length == 1) {
      console.log(filteredPitchList[0])
      const user = this.userService.user();
      if(user?.userId === filteredPitchList[0].ownerId || user?.userId === campaign.ownerId)
        return filteredPitchList[0].id;
    }
    return null;
  }

  hasPitchForCampaign(userId: string): boolean {
    for(const pitch of this.campaign.pitchList) {
      if(pitch.ownerId === userId){
        return true;
      }
    }
    return false;
  }

  hasCampaignAtLeastAcceptedPitch() {
    for(const pitch of this.campaign.pitchList) {
      if(pitch.pitchState !== "PENDING" && pitch.pitchState !== "SELECTED"){
        return true;
      }
    }
    return false;
  }

  onPitchSelected(pitch: any) {
    this.selectedPitchId.set(pitch.id);
    this.modalService.openPitchModal(pitch.id, 
      () => {
        this.refreshCampaign(this.campaign?.id);
        // Refresh campaign list to update icon based on state
        this.campaignChanged.emit();
      }, 
      () => console.error("Pitch error"));
  }

  rerunAnimation() {
    this.animationState = 'hide';
    setTimeout(() => this.animationState = 'show', 150);
  }

  onPitchUpdated() {
    console.log("Pitch updated")
    this.pitchRefresh.update(v => v + 1);
    this.refreshCampaign(this.campaign?.id);
    this.rerunAnimation();
    // Refresh campaign list to update icon based on state
    this.campaignChanged.emit();
  }
}
