import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsBrandService {

  constructor() { 
    console.log("isBrand constructor")
  }

  public getIsBrand() {
    return localStorage.getItem("isBrand") === "true";
  }

  public setIsBrand(isBrand:boolean) {
    return localStorage.setItem("isBrand", isBrand.toString());
  }
}
