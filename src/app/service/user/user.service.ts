import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from './user';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;

  user = signal<User | null>(null);

  constructor(private http: HttpClient, private keycloak: Keycloak) {
    this.getUser();
  }

  private setUser(user: User) {
    this.user.set(user);
  }

  private clearUser() {
    this.user.set(null);
  }

  getUser() {
    console.log("Get user")

    if(!this.keycloak.authenticated) {
      console.log("No authenticated user!");
      return;
    }

    this.http.get<User>(this.baseUrl + "/api/users/user").subscribe({
      next: (user) => {
        console.log("Get user user, fetched user: ", user)
        this.setUser(user)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  createUser() {
    // TODO ha loginról mész át registerre regisztrál de utána nem redirectel a user registrationoldalra!
    console.log("Create user")
    this.http.post<User>(this.baseUrl + "/api/users", null).subscribe({
        next: () => {
          console.log("Create user successfull");
          this.getUser();
        },
        error: (error) => {
          console.log(error);
        }
    });
  }

  updateUser(userType: string) {
    console.log("Update user");

    if(!this.keycloak.authenticated) {
      console.log("No authenticated user!");
      return;
    }
    
    this.http.put(this.baseUrl + "/api/users/user", {"userType": userType}).subscribe({
      next: () => {
        console.log("Update user to " + userType + " successfull");
        this.getUser();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
