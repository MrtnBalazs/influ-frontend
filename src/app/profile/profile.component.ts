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
export class ProfileComponent implements OnInit {
  error: Boolean = false;
  user: {email: string, username: string, userType: string, settings: {emailNotification: string}} | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (response: {email: string, username: string, userType: string, settings: {emailNotification: string}}) => {
        this.user = response;
      },
      error: () => {
        this.error = true;
      }
    });
  }

  clickToggle() {
    this.error = true;
    if(this.user) {
      // TODO send update with !(this.user.settings.emailNotification === "true")
      // TODO reload user
      //this.user.settings.emailNotification = "true";
    }
  }
}
