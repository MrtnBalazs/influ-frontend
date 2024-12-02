import { Injectable } from '@angular/core';
import { Campagne } from './campagne';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CampagneService {
  campagnes: Campagne[];

  public random = Math.random();

  constructor() {
    console.log("Service construcor");
    console.log(this.random);
    //this.campagnes = new Subject<Campagne[]>;
    this.campagnes = new Array();
    this.campagnes.push(new Campagne(
      "0",
      "Brandy",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a gall",
      "1000 HUF",
      "2000 HUF",
    ));
    this.campagnes.push(new Campagne(
      "1",
      "SAP",
      "ble content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content h", 
      "4000 HUF",
      "5000 HUF",
    ));
    this.campagnes.push(new Campagne(
      "2",
      "Vodafon",
      "re are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised w",
      "11000 HUF",
      "22000 HUF",
    ));
    console.log("Campagnes initialized, %s", this.campagnes);
  }

  getCampage(id: string): Campagne {
    console.log("Get campagne: %d", id);
    return this.campagnes[Number(id)];
  }

  getCampages() {
    console.log(JSON.stringify(this.campagnes));
    return this.campagnes;
  }

  getUserCampagnes() {
    return this.campagnes;
  }

  saveCampagne(campagne: Campagne) {
    console.log(JSON.stringify(campagne));
    this.campagnes.push(new Campagne(
      "999",
      campagne.title,
      campagne.description,
      campagne.minFee,
      campagne.maxFee
    ));
    console.log(JSON.stringify(this.campagnes));
  }
}
