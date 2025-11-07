import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LogoutMenuItem } from '../navbar/menu-items/LogoutMenuItem';
import { RegisterMenuItem } from '../navbar/menu-items/RegisterMenuItem';
import { LoginMenuItem } from '../navbar/menu-items/LoginMenuItem';
import { MenuItem } from '../navbar/menu-items/MenuItem';
import { RoutingMenuItem } from './menu-items/RoutingMenuItem';
import Keycloak from 'keycloak-js';
import { UserService } from '../service/user/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
    selector: 'app-navbar',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private destroyRef = inject(DestroyRef);
  menuItems: MenuItem[] = [];
  menuOpen = false;
  selectedMenuItemName: string | null = null;

  private readonly keycloak = inject(Keycloak);

  constructor (private router: Router, private userService: UserService) {
    this.selectedMenuItemName = 'Home';
  }

  ngOnInit(): void {
    if(this.keycloak.authenticated) {

      this.menuItems = [
        new RoutingMenuItem('Home', '/homepage', this.router),
        new LogoutMenuItem("Logout", this.keycloak),
      ];  

      this.userService.getUser()
        .subscribe(user => {
          console.log(user)
          if(user) {
            if(user.userType == 'BRAND') {
              this.menuItems = [
                new RoutingMenuItem('Home', '/homepage', this.router),
                new RoutingMenuItem('Campagnes', '/campagnes', this.router),
                new RoutingMenuItem('My campagnes', '/my-campagnes', this.router),
                new RoutingMenuItem('Create campagne', '/create-campagne', this.router),
                new RoutingMenuItem('Profile', '/profile', this.router),
                new LogoutMenuItem("Logout", this.keycloak)
              ];
            } else if(user.userType == "INFLUENCER"){
              this.menuItems = [
                new RoutingMenuItem('Home', '/homepage', this.router),
                new RoutingMenuItem('Campagnes', '/campagnes', this.router),
                new RoutingMenuItem('My pitches', '/my-pitches', this.router),
                new RoutingMenuItem('Profile', '/profile', this.router),
                new LogoutMenuItem("Logout", this.keycloak)
              ];
            } else {
              this.menuItems = [
                new RoutingMenuItem('Home', '/homepage', this.router),
                new RoutingMenuItem('Campagnes', '/campagnes', this.router),
                new RoutingMenuItem('Profile', '/profile', this.router),
                new LogoutMenuItem("Logout", this.keycloak)
              ];
            }
          }
        });

    } else {

      this.menuItems = [
        new RoutingMenuItem('Home', '/homepage', this.router),
        new RoutingMenuItem('Campagnes', '/campagnes', this.router),
        new LoginMenuItem('Login', this.keycloak),
        new RegisterMenuItem('Register', this.keycloak),
      ];  

    }

    var currentRoute = window.location.href;
    for(var menuItem of this.menuItems) {
      if(menuItem instanceof RoutingMenuItem && currentRoute.includes(menuItem.route)) {
        this.selectedMenuItemName = menuItem.name;
      }
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  selectMenuItem(menuItem: MenuItem) {
    menuItem.menuClicked();
    this.selectedMenuItemName = menuItem.name;
    if(this.menuOpen) {
      this.toggleMenu();
    }
  }
}