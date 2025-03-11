import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() {}

  getIsLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
  }

  login() {
    localStorage.setItem("isLoggedIn", "true");
  }

  logout() {
    localStorage.setItem("isLoggedIn", "false");
  }

  register() {}
}
