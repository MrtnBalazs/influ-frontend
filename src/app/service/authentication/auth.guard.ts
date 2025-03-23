import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map(isAuth => {
          return true; // set to true for dev purposes
        if (!isAuth) {
          this.router.navigate(['/error', 'Not authenticated! Login to reach this page']); // Redirect if not logged in
          //return false;
        }
        return true;
      })
    );
  }
}
