import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-profile',
    imports: [],
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    animations: [
        trigger('toggle', [
            state('false', style({ justifyContent: 'flex-start' })),
            state('true', style({ justifyContent: 'flex-end' })),
            transition('left <=> right', animate('0ms')), // no animation
        ]),
        trigger('shake', [
            transition(':enter', [
                animate('100ms ease', style({ transform: 'rotate(0.6deg)' })),
                animate('100ms ease', style({ transform: 'rotate(-0.6deg)' })),
                animate('100ms ease', style({ transform: 'rotate(0deg)' })),
            ])
        ]),
        trigger('fadeSlideId', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ]
})
export class ProfileComponent {
  error: boolean = false;
  user;

  constructor(private userService: UserService) {
    this.user = userService.user;
  }

  clickToggle() {
    this.error = true;
    if(this.user()) {
      // TODO send update with !(this.user.settings.emailNotification === "true")
      // TODO reload user
      //this.user.settings.emailNotification = "true";
    }
  }

  onBrandSelected() {
    this.userService.updateUser("BRAND");
  }

  onInfluSelected() {
    this.userService.updateUser("INFLUENCER");
  }
}
