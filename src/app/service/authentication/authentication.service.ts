import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8082/auth';
  private tokenKey = 'jwt_token';

  // Observable authentication state
  private authState = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http:HttpClient, private router:Router) {}

  /** Login: Sends credentials and stores JWT */
  login(username: string, password: string): Observable<{ authToken: string }> {
    return this.http.post<{ authToken: string }>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.authToken);
        this.authState.next(true);  // Notify subscribers
      })
    );
  }

  /** Logout: Clears JWT and updates state */
  logout(): void {
    console.log("AuthService logout");
    localStorage.removeItem(this.tokenKey);
    this.authState.next(false);
  }

  /** Register: Sends user data to backend */
  registerAsInflu(email:string, password:string, name:string, birthDate:string, contentTypes:string[], instagram:string, youtube:string, tiktok:string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, {email, password, name, birthDate, contentTypes, instagram, youtube, tiktok});
  }

  registerAsBrand(email: string, password:string, name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, {email, password, name});
  }

  /** Check if user is authenticated */
  isAuthenticated(): Observable<boolean> {
    //return this.authState.asObservable();
    return of(false)
  }

  /** Check if a JWT token exists */
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  /** Get the stored JWT token */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
