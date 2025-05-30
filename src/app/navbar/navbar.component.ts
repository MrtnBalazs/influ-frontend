import { Component } from '@angular/core';
import { IsBrandService } from '../service/is-brand/is-brand.service';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn = false;
  menuOpen = false;
  selectedRoute: string | null = null;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  constructor(
    private router: Router,
    private isBrandService: IsBrandService,
    private authenticationService: AuthenticationService
  ) {}

  isBrand() {
    return this.isBrandService.getIsBrand();
  }

  selectMenuItem(route: any) {
    console.log(route)
    this.selectedRoute = route;
    this.router.navigate([route])
  }

  ngOnInit(): void {
    this.authenticationService.isAuthenticated().subscribe(authStatus => {
      //this.isLoggedIn = authStatus;
      this.isLoggedIn = false; // set to always true for dev puroses
    });
  }

  loggedOutMenuItems = [
    { name: 'Home', route: '/homepage' },
    { name: 'Campagnes', route: '/campagnes' },
    { name: 'Brands', route: '/brands' },
    { name: 'Influencers', route: '/influencers' },
  ]

  commonMenuItemsFront = [
    { name: 'Home', route: '/homepage' },
  ]

  commonMenuItemsBack = [
    { name: 'Profile', route: '/profile' },
    { name: 'Messages', route: '/messages' },
    { name: 'Settings', route: '/settings' },
  ]

  influMenuItems = [
    { name: 'Campagnes', route: '/campagnes' },
    { name: 'Saved campagnes', route: '/saved-campagnes' },
    { name: 'My pitches', route: '/my-pitches' },
    { name: 'Saved Brands', route: '/saved-brands' },
    { name: 'Brands', route: '/brands' },
  ];

  brandMenuItems = [
    { name: 'My campagnes', route: '/my-campagnes' },
    { name: 'Create campagne', route: '/create-campagne' },
    { name: 'Saved influencers', route: '/saved-influencers' },
    { name: 'Influencers', route: '/influencers' },
  ];

  getRouteList() {
    if(this.isLoggedIn) {
      if(this.isBrand())
        return this.commonMenuItemsFront.concat(this.brandMenuItems).concat(this.commonMenuItemsBack);
      else
        return this.commonMenuItemsFront.concat(this.influMenuItems).concat(this.commonMenuItemsBack);
    } else {
      return this.loggedOutMenuItems;
    }
  }

  switchBrandCampagne() {
    this.isBrandService.setIsBrand(!this.isBrand());
  }

  logOut() {
    this.authenticationService.logout();
  }
}
