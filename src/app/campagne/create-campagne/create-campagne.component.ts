import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CampagneService } from '../../service/campagne/campagne.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { MultipleSelectorPopupComponent } from '../../common/multiple-selector-popup/multiple-selector-popup.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-campagne',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MultipleSelectorPopupComponent],
  templateUrl: './create-campagne.component.html',
  styleUrl: './create-campagne.component.css',
  animations: [
      trigger('shake', [
        transition(':enter', [
          animate('100ms ease', style({ transform: 'rotate(0.6deg)' })),
          animate('100ms ease', style({ transform: 'rotate(-0.6deg)' })),
          animate('100ms ease', style({ transform: 'rotate(0deg)' })),
        ])
        ]
      ),
      trigger('fadeSlideId', [
        transition(':enter', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ])
      ])
    ]
})
export class CreateCampagneComponent {
  createCampaignForm: any;
  error: Boolean = false;
  createClicked = false;

  constructor(
    private campagneService: CampagneService,
    private fb: FormBuilder,
    private router:Router
  ) {
    this.createCampaignForm = this.fb.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
          contentGuideline: ['', Validators.required],
          fee: ['', [Validators.required, Validators.pattern('^\\d*\\.?\\d*$')]],
          campaignType: ['', Validators.required],
    });
  }

  onCampaignTypeSelected(campaignType: string[]) {
    this.createCampaignForm.patchValue({
      campaignType: campaignType
    });
  }

  createCampagne() {
      this.createClicked = true;
      if (this.createCampaignForm.invalid) return;
      this.createClicked = false;
      this.campagneService.saveCampaign(this.createCampaignForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/homepage'])
        },
        error: (error) => {
          this.error = true;
        }
      });
  }
}
