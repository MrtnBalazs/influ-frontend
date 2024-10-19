import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn: boolean | undefined;

  constructor() { }

  register(username: string, password: string) {
    // Make http call, set loggedin
  }
}
