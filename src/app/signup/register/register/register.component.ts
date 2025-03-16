import { Component } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication/authentication.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    username = "";
    password = "";

    constructor(
      private authenticationService: AuthenticationService,
      private router:Router
    ) {}

    onRegisterClick() {
      console.log("Register clicked!");
      this.authenticationService.register(this.username, this.password);
    }
}
