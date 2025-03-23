import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampagneService {
  private apiUrl = 'http://localhost:8083/api/v1/campagnes';
  private dev = true;
  private devCampagnes: Observable<any[]> = of([
    {"id":"0", "title":"Porche new model", "description":"Porche new model beeing released we need...", "minFee":"2000", "maxFee":"3000"},
    {"id":"1", "title":"Mol price drop", "description":"Mol lowered its prices and we need people to be aware...", "minFee":"2000", "maxFee":"3000"},
    {"id":"2", "title":"Hell new product", "description":"Hell is releasing a new product called Hell Water...", "minFee":"2000", "maxFee":"3000"},
  ]);
  private devCampagne: Observable<any> = of(
    {"id":"1", "title":"Porche new model", "description":"Porche new model beeing released we need...", "minFee":"2000", "maxFee":"3000"}
  );

  constructor(private http: HttpClient) {}

  getAllCampagnes(): Observable<any[]> {
    if(this.dev) {
      return this.devCampagnes;
    }
    return this.http.get<any[]>(this.apiUrl);
  }

  getCampagneById(id: string): Observable<any> {
    if(this.dev) {
      var campagne;
      this.devCampagnes.subscribe(campagnes => {
        campagne = campagnes[Number(id)];
      })
      return of(campagne);
    }
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getMyCampagnes(): Observable<any[]> {
    if(this.dev) {
      return this.devCampagnes;
    }
    return this.http.get<any[]>(`${this.apiUrl}/my-campagnes`);
  }

  getSavedCampagnes(): Observable<any[]> {
    if(this.dev) {
      return this.devCampagnes;
    }
    return this.http.get<any[]>(`${this.apiUrl}/saved-campagnes`);
  }
}
