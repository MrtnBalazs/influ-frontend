import { Component, inject, output } from '@angular/core';
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

@Component({
    selector: 'app-campage',
    imports: [CommonModule, PitchListComponent, ButtonBarComponent],
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
  @Input() id: any = null;
  campaignId = signal<any | null>(null);
  campaignDeleted = output<void>();  // signal-based Output
  campaign: any = null;
  selectedPitchId = signal<any | null>(null);
  animationState = 'show';
  @Input() withPitches = false;
  isUserCampaignOwner = false;
  userType: any = "";
  userEmail: any = "";
  campaignButtons: Button[] = []

  constructor(private modalService: ModalService, private campagneService: CampagneService, private userService: UserService) {
  }

  @Input({ transform: (c: any) => c }) 
  set selectedCampaign(value: any) {
    this.rerunAnimation();
    if (value) {
      this.campaignId.set(value);
      this.refreshCampaign();
    }
  }

  refreshCampaign() {
    this.campagneService.getCampagneById(this.campaignId())
      .subscribe({
        next: (response: { campaign: any }) => {
          this.campaign = response.campaign;
          const user = this.userService.user();

          if(user?.userId && this.campaign.ownerId == user?.userId) {
            this.isUserCampaignOwner = true;
            this.campaignButtons = [
                  new Button("Delete campaign", "red", () => {
                    this.campagneService.deleteCampaignById(this.campaignId()).subscribe({
                      next: () => {
                        this.campaign = null;
                    this.campaignId.set(null);
                    this.selectedPitchId.set(null);
                    this.campaignDeleted.emit();
                      },
                      error: (error) => {
                        console.error(error);
                      }
                    });
                  }),
                ]
          } else if(user?.userType == INFLUENCER && !this.hasPitchForCampaign(user.userId)) {
                this.campaignButtons = [
                  new Button("Create pitch", "green", () => {this.modalService.openCreatePitchModal(this.campaignId(), () => this.refreshCampaign())}),
                ]
          } else {
            this.campaignButtons = []
          }
        },
        error: (error) => {
          console.error(error);
          this.campaignId = signal<any | null>(null);
          this.campaign = null;
        }
      });
  }

  hasPitchForCampaign(userId: string): boolean {
    for(const pitch of this.campaign.pitchList) {
      if(pitch.ownerId === userId){
        return true;
      }
    }
    return false;
  }

  onPitchSelected(pitch: any) {
    this.selectedPitchId.set(pitch.id);
    this.modalService.openPitchModal(pitch.id, () => this.refreshCampaign(), () => console.error("Pitch error"));
  }


  rerunAnimation() {
    this.animationState = 'hide';
    setTimeout(() => this.animationState = 'show', 150); // quickly reset to rerun
  }
}
