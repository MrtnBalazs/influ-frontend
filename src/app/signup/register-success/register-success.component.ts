import { Component, effect} from '@angular/core';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-register-success',
  imports: [],
  templateUrl: './register-success.component.html',
  styleUrl: './register-success.component.css',
})
export class RegisterSuccessComponent {
  status: string;

  constructor (private userService: UserService) {
    this.status = "in progress";
    userService.createUser();

    effect(() => {
      if(userService.user()) {
        this.status = "successfull";
      }
    })
  }
}
