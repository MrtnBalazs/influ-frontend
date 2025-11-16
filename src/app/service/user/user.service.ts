import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;

  user = signal<User | null>(null);

  setUser(user: User) {
    this.user.set(user);
  }

  clearUser() {
    this.user.set(null);
  }

  constructor(private http: HttpClient) {
    this.getUser();
  }

  getUser() {
    console.log("Get user")
    return this.http.get<User>(this.baseUrl + "/api/users/user").subscribe({
      next: (user) => {
        console.log("Get user user, fetched user: ", user)
        this.setUser(user)
      },
      error: (error) => {
        console.log("User not found");
        console.log(error);
      }
    });
  }

  getUsers(userType: string) {
    if(userType) {
      return this.http.get<{ users: any[] }>(this.baseUrl + "/api/users?user_type" + userType);
    } else {
      return this.http.get<{ users: any[] }>(this.baseUrl + "/api/users");
    }
  }

  createUser() {
    console.log("Create user")
    return this.http.post<User>(this.baseUrl + "/api/users", null).subscribe({
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
