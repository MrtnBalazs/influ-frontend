import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn: boolean | undefined;

  constructor() { }

  register(username: string | undefined, password: string | undefined) {
    // Make http call, set loggedin
  }
}
