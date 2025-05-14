import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8081';
  private dev = false;
  private devUserResponse: Observable<any> = of({
    "user": {
        "username": "username1",
        "userType": "INFLUENCER",
        "settings": {
            "emailNotifications": false
        }
    }
  });
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
    if(this.dev) {
      return this.devUserResponse;
    } else {
      return this.http.get<{ user: any[] }>(this.baseUrl + "/api/v1/users/user");
    }
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
