import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'; // import environment

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;

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
}
