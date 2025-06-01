import { Component } from '@angular/core';
import { IsBrandService } from '../service/is-brand/is-brand.service';
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
    private isBrandService: IsBrandService,
    private authenticationService: AuthenticationService
  ) {
    this.selectedMenuItemName = 'Home';
  }

  ngOnInit(): void {
    var isLoggedIn;
    this.authenticationService.isAuthenticated().subscribe(authStatus => {
      //this.isLoggedIn = authStatus;
      isLoggedIn = false; // TODO dev puroses only, change it back for prod!
    });
    var isBrand = this.isBrandService.getIsBrand();

    var loggedOutMenuItems = [
      new RoutingMenuItem('Home', '/homepage', this.router),
      new RoutingMenuItem('Campagnes', '/campagnes', this.router),
      new RoutingMenuItem('Login', '/login', this.router),
      new RoutingMenuItem('Register', '/register', this.router),
    ];
    var commonMenuItemsFront = [
      new RoutingMenuItem('Home', '/homepage', this.router)
    ];
    var commonMenuItemsBack = [
      new RoutingMenuItem('Profile', '/profile', this.router),
      new RoutingMenuItem('Messages', '/messages', this.router),
      new RoutingMenuItem('Settings', '/settings', this.router),
      new LogoutMenuItem("Logout", "/homepage", this.router, this.authenticationService)
    ];
    var influMenuItems = [
      new RoutingMenuItem('Campagnes', '/campagnes', this.router),
      new RoutingMenuItem('Saved campagnes', '/saved-campagnes', this.router),
      new RoutingMenuItem('My pitches', '/my-pitches', this.router),
      new RoutingMenuItem('Saved Brands', '/saved-brands', this.router),
      new RoutingMenuItem('Brands', '/brands', this.router),
    ];
    var brandMenuItems = [
      new RoutingMenuItem('My campagnes', '/my-campagnes', this.router),
      new RoutingMenuItem('Create campagne', '/create-campagne', this.router),
      new RoutingMenuItem('Saved influencers', '/saved-influencers', this.router),
      new RoutingMenuItem('Influencers', '/influencers', this.router),
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
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  clickBrandLogo() {
    this.isBrandService.switchIsBrand();
    this.selectedMenuItemName = 'Home';
    this.router.navigate(['/homepage']);
  }

  selectMenuItem(menuItem: MenuItem) {
    menuItem.menuClicked();
    this.selectedMenuItemName = menuItem.name;
  }
}
