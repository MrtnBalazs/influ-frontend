import { Component } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { Input } from '@angular/core';
import { OnInit } from '../../../../node_modules/@angular/core/index';
import { signal } from '@angular/core';
import { PitchListDetailComponent } from "../../pitch/pitch-list-detail/pitch-list-detail.component";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campage',
  standalone: true,
  imports: [PitchListDetailComponent, CommonModule ],
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
export class CampageComponent implements OnInit {
  @Input() id: any = null;
  campaignId = signal<any | null>(null);
  campaign: any = null;
  selectedPitchId = signal<any | null>(null);
  animationState = 'show';
  @Input() withPitches = false;

  constructor(private campagneService: CampagneService) {}

  ngOnInit() {
    if(this.id) {
      this.campagneService.getCampagneById(this.id).subscribe((response: { campaign: any }) => {
      this.campaign = response.campaign;
    });
    }
  }

  @Input({ transform: (c: any) => c }) 
  set selectedCampaign(value: any) {
    this.rerunAnimation();
    if (value) {
      this.campaignId.set(value);
      this.campagneService.getCampagneById(this.campaignId()).subscribe((response: { campaign: any }) => {
        this.campaign = response.campaign;
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
