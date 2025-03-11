import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  authService = inject(AuthenticationService);
  username: string | undefined;
  password: string | undefined;

  onRegisterClick() {
    console.log("Register clicked!")
    this.authService.register();
  }
}
