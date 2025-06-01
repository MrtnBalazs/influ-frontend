import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  registerForm: any;
  registerClicked = false;
  toggleState = "influencer";

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router:Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      contentType: ['', Validators.required],
      instagram: ['', Validators.required],
      youtube: ['', Validators.required],
      tiktok: ['', Validators.required],
    });
  }

  isInfluencerRegister() {
    return this.toggleState === "influencer";
  }

  clickToggle() {
    if(this.toggleState === "influencer")
      this.toggleState = "brand";
    else
      this.toggleState = "influencer";
  }

  formSubmitted() {
    console.log("Register clicked!");
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
}
