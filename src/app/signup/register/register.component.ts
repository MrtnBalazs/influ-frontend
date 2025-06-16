import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { REGISTER_BRAND, REGISTER_INFLUENCER } from '../../consts';
import { MultipleSelectorPopupComponent } from "../../common/multiple-selector-popup/multiple-selector-popup.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MultipleSelectorPopupComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  animations: [
    trigger('toggle', [
      state('influencer', style({ justifyContent: 'flex-start' })),
      state('brand', style({ justifyContent: 'flex-end' })),
      transition('left <=> right', animate('0ms')), // no animation
    ]),
    trigger('fadeSlideId', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('shake', [
        transition(':enter', [
          animate('100ms ease', style({ transform: 'rotate(0.6deg)' })),
          animate('100ms ease', style({ transform: 'rotate(-0.6deg)' })),
          animate('100ms ease', style({ transform: 'rotate(0deg)' })),
        ])
        ]
    ),
  ]
})
export class RegisterComponent {
  registerBrandForm: any;
  registerInfluencerForm: any;
  registerClicked = false;
  toggleState = REGISTER_INFLUENCER;
  errorWhenRegister: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router:Router
  ) {
    this.registerBrandForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
    }),
    this.registerInfluencerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      birthDate: ['', [Validators.required, this.validDateValidator()]],
      contentTypes: [[], Validators.required],
      instagram: [''],
      youtube: [''],
      tiktok: [''],
    },
    {
      validators: this.atLeastOneRequiredValidator()
    });
  }

  isInfluencerRegister() {
    return this.toggleState === REGISTER_INFLUENCER;
  }

  clickToggle() {
    if(this.toggleState === REGISTER_INFLUENCER)
      this.toggleState = REGISTER_BRAND;
    else
      this.toggleState = REGISTER_INFLUENCER;

    this.registerClicked = false;
  }

  onContentTypesSelected(contentTypes: string[]) {
    console.log(this.registerInfluencerForm.value);
    this.registerInfluencerForm.patchValue({
      contentTypes: contentTypes
    });
    console.log(this.registerInfluencerForm.value);
  }

  formSubmitted() {
    this.registerClicked = true;
    if(this.isBrandRegistering()) {
      if (this.registerBrandForm.invalid) {
        return;
      } else {
        const { email, password, name } = this.registerBrandForm.value;
        this.authenticationService.registerAsBrand(email, password, name)
          .subscribe({
            next: () => {
              this.router.navigate(['/registration/success']);
            },
            error: (error) => {
              console.error('Registration failed', error);
              this.router.navigate(['/error', `Register failed: ${error}`]);
            }
        });
      }
    } else {
      if (this.registerInfluencerForm.invalid) {
        return;
      } else {
        const { email, password, name, birthDate, contentTypes, instagram, youtube, tiktok } = this.registerBrandForm.value;
        this.authenticationService.registerAsInflu(email, password, name, birthDate, contentTypes, instagram, youtube, tiktok)
          .subscribe({
            next: () => {
              this.router.navigate(['/homepage']);
            },
            error: (error) => {
              this.errorWhenRegister = true;
            }
          });
      }
    }
  }

  isBrandRegistering(): boolean {
    return this.toggleState === REGISTER_BRAND;
  }

  atLeastOneRequiredValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const instagram = control.get('instagram')?.value;
      const youtube = control.get('youtube')?.value;
      const tiktok = control.get('tiktok')?.value;

      const hasAtLeastOne = !!(instagram || youtube || tiktok);

      return hasAtLeastOne ? null : { atLeastOneRequired: true };
    };
  }

  validDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // If value is empty, don't validate (let required validator handle it)
      if (!value) return null;

      // Regex to match YYYY-MM-DD
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(value)) {
        return { invalidDateFormat: true };
      }

      // Parse and check for real date
      const [year, month, day] = value.split('-').map(Number);
      const date = new Date(year, month - 1, day);

      const isValidDate =
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;

      return isValidDate ? null : { invalidDateFormat: true };
    };
  }
}