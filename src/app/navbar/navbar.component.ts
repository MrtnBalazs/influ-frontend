import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LogoutMenuItem } from '../navbar/menu-items/LogoutMenuItem';
import { MenuItem } from '../navbar/menu-items/MenuItem';
import { RoutingMenuItem } from './menu-items/RoutingMenuItem';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuItems: MenuItem[] = [];
  menuOpen = false;
  selectedMenuItemName: string | null = null;

  constructor (
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.selectedMenuItemName = 'Home';
  }

  ngOnInit(): void {
    this.authenticationService.getUser().subscribe(user => {
      var isLoggedIn;
      if(!user) {
        isLoggedIn = false;
      } else {
        isLoggedIn = true;
      }
      var isBrand;
      isBrand = user?.userType === "BRAND";

      var loggedOutMenuItems = [
        new RoutingMenuItem('Home', '/homepage', this.router),
        new RoutingMenuItem('Campagnes', '/campagnes', this.router),
        new RoutingMenuItem('Login', '/login', this.router),
        new RoutingMenuItem('Register', '/register', this.router),
      ];
      var commonMenuItemsFront = [
        new RoutingMenuItem('Campagnes', '/campagnes', this.router),
      ];
      var commonMenuItemsBack = [
        new RoutingMenuItem('Profile', '/profile', this.router),
        new LogoutMenuItem("Logout", "/homepage", this.router, this.authenticationService)
      ];
      var influMenuItems = [
        new RoutingMenuItem('Campagnes', '/campagnes', this.router),
        new RoutingMenuItem('My pitches', '/my-pitches', this.router),
      ];
      var brandMenuItems = [
        new RoutingMenuItem('My campagnes', '/my-campagnes', this.router),
        new RoutingMenuItem('Create campagne', '/create-campagne', this.router),
      ];

      if(isLoggedIn) {
        this.menuItems = commonMenuItemsFront;
        if(isBrand) {
          this.menuItems = this.menuItems.concat(brandMenuItems);
        } else {
          this.menuItems = this.menuItems.concat(influMenuItems);
        }
        this.menuItems = this.menuItems.concat(commonMenuItemsBack);
      } else {
        this.menuItems = loggedOutMenuItems;
      }

      var currentRoute = window.location.href;
      for(var menuItem of this.menuItems) {
        if(menuItem instanceof RoutingMenuItem && currentRoute.includes(menuItem.route)) {
          this.selectedMenuItemName = menuItem.name;
        }
      }
    });
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
