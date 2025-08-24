import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8081/api/auth';
  private tokenKey = 'jwt_token';

  // Observable authentication state
  private authState = new BehaviorSubject<boolean>(this.hasToken());
  private user = new BehaviorSubject<{ authToken: any, email: any, userType: any } | null>(null);

  constructor(private http:HttpClient, private router:Router) {
    //this.apiUrl = 'https://8vklq.wiremockapi.cloud/api/auth'; //TODO DEV
    if(this.hasToken()){
      this.decodeAndStoreUser(this.getToken());
    }
  }

  private decodeAndStoreUser(token: string | null) {
  // Option 1: Decode token locally (roles in JWT claims)
  if(token != null) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    this.user.next({
      authToken: payload.sub,
      email: payload.sub,
      userType: payload.type,
    });
  }
}

  /** Login: Sends credentials and stores JWT */
  login(username: string, password: string): Observable<{ authToken: string }> {
    return this.http.post<{ authToken: string, email: string, userType: string }>(`${this.apiUrl}/login`, { 
      "email" :username,
      "password": password 
    }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.authToken);
        this.user.next(response);
      })
    );
  }

  /** Logout: Clears JWT and updates state */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.user.next(null);
  }

  /** Register: Sends user data to backend */
  registerAsInflu(email:string, password:string, name:string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      "email": email,
      "password": password, 
      "username": name,
      "userType": "INFLUENCER"
    });
  }

  registerAsBrand(email: string, password:string, name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      "email": email,
      "password": password, 
      "username": name,
      "userType": "BRAND"
    });
  }

  getUser() {
    //this.user.next({ authToken: "string", email: "influencer@test.com", userType: "INFLUENCER" }); // TODO DEV
    //this.user.next({ authToken: "string", email: "brand@test.com", userType: "BRAND" }); // TODO DEV
    return this.user.asObservable();  
  }

  /** Check if a JWT token exists */
  hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  /** Get the stored JWT token */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
