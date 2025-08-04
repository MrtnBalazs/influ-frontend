import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://8vklq.wiremockapi.cloud';
  private dev = false;
  private devUserListResponse: Observable<any> = of({
    "users": [
        {
            "username": "username",
            "userType": "BRAND",
            "settings": {
                "emailNotifications": false
            }
        },
        {
            "username": "username2",
            "userType": "INFLUENCER",
            "settings": {
                "emailNotifications": false
            }
        },
        {
            "username": "username3",
            "userType": "BRAND",
            "settings": {
                "emailNotifications": false
            }
        }
    ]
  });

  constructor(private http: HttpClient) {}

  getUser() {
      return this.http.get<{email: string, username: string, userType: string, settings: {emailNotification: string}}>(this.baseUrl + "/api/users/user");
  }

  getUsers(userType: string) {
    if(this.dev) {
      return this.devUserListResponse;
    } else {
      if(userType) {
        return this.http.get<{ users: any[] }>(this.baseUrl + "/api/v1/users?user_type" + userType);
      } else {
        return this.http.get<{ users: any[] }>(this.baseUrl + "/api/v1/users");
      }
    }
  }
}
