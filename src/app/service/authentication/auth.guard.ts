import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUser().pipe(
      map(user => {
        if (!user) {
          console.error("Not authenticated! Auth guard!")
          return false;
        }
        return true;
      })
    );
  }
}
