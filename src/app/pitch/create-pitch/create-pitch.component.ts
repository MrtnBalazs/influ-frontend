import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-pitch',
    imports: [FormsModule, ReactiveFormsModule],
    standalone: true,
    templateUrl: './create-pitch.component.html',
    styleUrl: './create-pitch.component.css',
    animations: [
        trigger('shake', [
            transition(':enter', [
                animate('100ms ease', style({ transform: 'rotate(0.6deg)' })),
                animate('100ms ease', style({ transform: 'rotate(-0.6deg)' })),
                animate('100ms ease', style({ transform: 'rotate(0deg)' })),
            ])
        ]),
        trigger('fadeSlideId', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ]
})
export class CreatePitchComponent {
  @Input() campaignId = "";
  @Input() onClose!: () => void;
  error = false;
  createClicked = false;
  createPitchForm: any;
    constructor(
      private campagneService: CampagneService,
      private fb: FormBuilder,
      private router:Router
    ) {
      this.createPitchForm = this.fb.group({
            title: ['', Validators.required],
            text: ['', Validators.required],
      });
    }

    createPitch() {
      this.createClicked = true;
      if (this.createPitchForm.invalid) return;
      this.createClicked = false;
      const {title, text, campaignId = this.campaignId} = this.createPitchForm.value;
      this.campagneService.savePitch({title, text, campaignId})
      .subscribe({
        next: () => {
          this.onClose()
        },
        error: (error) => {
          this.error = true;
          console.error(error);
        }
      });
    }

    closeModal() {
      if (this.onClose) {
        this.onClose();   // <-- close modal
      }
    }
}
