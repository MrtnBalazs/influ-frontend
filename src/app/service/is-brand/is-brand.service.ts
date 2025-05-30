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

  public setIsBrand(isBrand:boolean) {
    console.log("IsBrand: " + isBrand);
    return localStorage.setItem("isBrand", isBrand.toString());
  }
}
