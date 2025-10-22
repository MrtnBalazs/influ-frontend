import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {
    //this.baseUrl = 'https://8vklq.wiremockapi.cloud'; // TODO dev
  }

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
