import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiLoginUrl = 'http://localhost:8081/auth/login';
  private apiRegisterUrl = 'http://localhost:8081/auth/signup';
  private authToken:string | null | undefined;

  constructor(private http:HttpClient, private router:Router) {
  }

  getIsLoggedIn() {
    //return localStorage.getItem("isLoggedIn") === "true";
    return this.authToken !== "";
  }

  login(username: string, password: string) {
    //localStorage.setItem("isLoggedIn", "true");
    const body = { username, password };
    return this.http.post<any>(this.apiLoginUrl, body)
    .subscribe({
      next: ({authToken}) => {
        this.authToken = authToken;
        this.router.navigate(['/profile'])
      },
      error: (error) => {
        this.router.navigate(['/error', "Login failed"]);
      }
    });
  }

  logout() {
    //localStorage.setItem("isLoggedIn", "false");
    this.authToken = "";
  }

  register(username: string, password: string) {
    const body = { username, password };
    this.http.post<any>(this.apiRegisterUrl, body).subscribe({
      next: () => {
        console.log('User registered successfully!');
        this.router.navigate(['/registration/success']);
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.router.navigate(['/error', "Register failed"]);
      }
    });
  }
}
