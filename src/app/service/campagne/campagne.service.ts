import { Injectable } from '@angular/core';
import { Campagne } from './campagne';

@Injectable({
  providedIn: 'root'
})
export class CampagneService {
  campagnes: Campagne[];

  constructor() { 
    this.campagnes = new Array();
    this.campagnes.push(new Campagne("Brandy", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a gall",
      "1000 HUF",
      "2000 HUF"));
    this.campagnes.push(new Campagne("SAP", "ble content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content h", 
      "4000 HUF",
      "5000 HUF"));
    this.campagnes.push(new Campagne("Vodafon", "re are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised w", "11000 HUF", "22000 HUF"));
    console.log("Campagnes initialized, %s", this.campagnes);
  }

  getCampage(id: string): Campagne {
    console.log("Get campagne: %d", id);
    return this.campagnes[Number(id)];
  }

  getCampages() {
    return this.campagnes;
  }

  getUserCampagnes() {
    return this.campagnes;
  }
}
