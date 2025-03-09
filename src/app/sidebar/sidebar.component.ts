import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isOpen = true;
  isBrand = true;

  commonMenuItemsFront = [
    { name: 'Home', route: '/homepage' },
    { name: 'Register', route: '/signup' },
  ]

  commonMenuItemsBack = [
    { name: 'Messages', route: '/messages' },
    { name: 'Profile', route: '/profile' },
    { name: 'Settings', route: '/settings' },
  ]

  influMenuItems = [
    { name: 'Campagnes', route: '/campagnes' },
    { name: 'My pitches', route: '/my-pithces' },
    { name: 'Saved campagnes', route: '/saved-campagnes' },
    { name: 'Brands', route: '/brands' },
    { name: 'Saved Brands', route: '/saved-brands' },
  ];

  brandMenuItems = [
    { name: 'My campagnes', route: '/campagnes' },
    { name: 'Create campagne', route: '/create-campagne' },
    { name: 'Influencers', route: '/influencers' },
    { name: 'Saved influencers', route: '/saved-influencers' },
  ];

  getRouteList() {
    this.commonMenuItemsBack
    if(this.isBrand)
      return this.commonMenuItemsFront.concat(this.brandMenuItems).concat(this.commonMenuItemsBack);
    else
      return this.commonMenuItemsFront.concat(this.influMenuItems).concat(this.commonMenuItemsBack);
  }

  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }

  switchBrandCampagne() {
    this.isBrand = !this.isBrand;
  }
}
