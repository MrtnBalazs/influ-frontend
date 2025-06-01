import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsBrandService {

  constructor() { 
  }

  public getIsBrand() {
    return localStorage.getItem("isBrand") === "true";
  }

  public switchIsBrand() {
    console.log("IsBrand: " + !this.getIsBrand());
    return localStorage.setItem("isBrand", (!this.getIsBrand()).toString());
  }
}
