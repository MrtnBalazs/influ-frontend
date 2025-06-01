import { Component } from '@angular/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
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
export class LoginComponent {
  loginForm: any;
  errorWhenLogin: Boolean = false;
  loginClicked = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router:Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email], []],
      password: ['', Validators.required],
    });
  }

  formSubmitted() {
    this.loginClicked = true;
    if (this.loginForm.invalid) return;
    this.errorWhenLogin = false;
    const { username, password } = this.loginForm.value;
    this.authenticationService.login(username, password)
    .subscribe({
      next: () => {
        this.router.navigate(['/homepage'])
      },
      error: (error) => {
        this.errorWhenLogin = true;
      }
    });
  }
}
