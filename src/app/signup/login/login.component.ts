import { Component } from '@angular/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    username = "";
    password = "";

    constructor(
      private authenticationService: AuthenticationService,
      private router:Router
    ) {}

    onLoginClick() {
      console.log("Login clicked!")
      this.authenticationService.login(this.username, this.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/homepage'])
        },
        error: (error) => {
          this.router.navigate(['/error', `Login failed: ${error}`]);
        }
      });
    }
}
