import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LogoutMenuItem } from '../navbar/menu-items/LogoutMenuItem';
import { RegisterMenuItem } from '../navbar/menu-items/RegisterMenuItem';
import { LoginMenuItem } from '../navbar/menu-items/LoginMenuItem';
import { MenuItem } from '../navbar/menu-items/MenuItem';
import { RoutingMenuItem } from './menu-items/RoutingMenuItem';
import Keycloak from 'keycloak-js';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuItems: MenuItem[] = [];
  menuOpen = false;
  selectedMenuItemName: string | null = null;

  private readonly keycloak = inject(Keycloak);

  constructor (private router: Router) {
    this.selectedMenuItemName = 'Home';
  }

  ngOnInit(): void {

    this.menuItems = [
      new RoutingMenuItem('Home', '/homepage', this.router),
      new RoutingMenuItem('Campagnes', '/campagnes', this.router),
      new LoginMenuItem('Login', this.keycloak),
      new RegisterMenuItem('Register', this.keycloak),
    ];

    if(this.keycloak.authenticated) {

      this.keycloak.loadUserProfile().then(user => {

        if(user && user.attributes) {
          if(user.attributes['userType'] == 'BRAND') {
            this.menuItems = [
              new RoutingMenuItem('Home', '/homepage', this.router),
              new RoutingMenuItem('Campagnes', '/campagnes', this.router),
              new RoutingMenuItem('My campagnes', '/my-campagnes', this.router),
              new RoutingMenuItem('Create campagne', '/create-campagne', this.router),
              new RoutingMenuItem('Profile', '/profile', this.router),
              new LogoutMenuItem("Logout", this.keycloak)
            ];
          } else if(user.attributes['userType'] == "INFLUENCER"){
            this.menuItems = [
              new RoutingMenuItem('Home', '/homepage', this.router),
              new RoutingMenuItem('Campagnes', '/campagnes', this.router),
              new RoutingMenuItem('My pitches', '/my-pitches', this.router),
              new RoutingMenuItem('Profile', '/profile', this.router),
              new LogoutMenuItem("Logout", this.keycloak)
            ];
          }
        }

        var currentRoute = window.location.href;
        for(var menuItem of this.menuItems) {
          if(menuItem instanceof RoutingMenuItem && currentRoute.includes(menuItem.route)) {
            this.selectedMenuItemName = menuItem.name;
          }
        }

      })

    }

  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  selectMenuItem(menuItem: MenuItem) {
    menuItem.menuClicked();
    this.toggleMenu();
    this.selectedMenuItemName = menuItem.name;
  }
}
