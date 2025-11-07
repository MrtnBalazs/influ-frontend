import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment'; // import environment

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;

  // TODO user = signal<User | null>(null); Refactor to use signal so that the page is not needed to reload after something is updated

  constructor(private http: HttpClient) {}

  getUser() {
      return this.http.get<{email: string, username: string, userType: string, settings: {emailNotification: string}}>(this.baseUrl + "/api/users/user");
  }

  getUsers(userType: string) {
    if(userType) {
      return this.http.get<{ users: any[] }>(this.baseUrl + "/api/users?user_type" + userType);
    } else {
      return this.http.get<{ users: any[] }>(this.baseUrl + "/api/users");
    }
  }

  createUser() {
    return this.http.post(this.baseUrl + "/api/users", null);
  }

  updateUser(userData: {userType: string}) {
    return this.http.put(this.baseUrl + "/api/users/user", userData);
  }
}
