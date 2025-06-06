import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { REGISTER_BRAND, REGISTER_INFLUENCER } from '../../consts';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
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
    ])
  ]
})
export class RegisterComponent {
  registerBrandForm: any;
  registerInfluencerForm: any;
  registerClicked = false;
  toggleState = REGISTER_INFLUENCER;

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
      birthDate: ['', Validators.required,],
      contentType: ['', Validators.required],
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
  }

  formSubmitted() {
    this.registerClicked = true;
    if(this.isBrandRegistering()) {
      if (this.registerBrandForm.invalid) return;
    } else {
      if (this.registerInfluencerForm.invalid) return;
    }
    console.log("Register process start!");
    /*
    this.authenticationService.register(this.email, this.password)
    .subscribe({
      next: () => {
        console.log('User registered successfully!');
        this.router.navigate(['/registration/success']);
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.router.navigate(['/error', `Register failed: ${error}`]);
      }
    });
    */
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
}