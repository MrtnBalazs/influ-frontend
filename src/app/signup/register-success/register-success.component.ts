import { Component, DestroyRef, inject } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register-success',
  imports: [],
  templateUrl: './register-success.component.html',
  styleUrl: './register-success.component.css',
})
export class RegisterSuccessComponent {
  private destroyRef = inject(DestroyRef);

  constructor (private userService: UserService) {
    userService.createUser();
  }
}
