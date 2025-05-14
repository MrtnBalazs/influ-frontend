import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((response: { user: any }) => {
      this.user = response.user;
    });
  }
}
