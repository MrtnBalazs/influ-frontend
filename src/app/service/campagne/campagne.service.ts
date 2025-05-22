import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampagneService {
  private baseUrl = 'http://localhost:8081';
  private dev = true;
  private devPitchResponse: Observable<any> = of({
    "pitch": {
        "id": 1,
        "creatorId": "username1",
        "title": "Test pitch title",
        "text": "Test pitch text"
    }
  });
  private devCampagneResponse: Observable<any> = of({
    "campaign": {
        "id": 1,
        "userId": "username",
        "title": "Test Campaign",
        "description": "Lorem Ipsumis simply dummy text of the printing" + 
                        "and typesetting industry. Lorem Ipsum has been the industrys sived not only five centuries, but also the leap into electronic typesetting." +
                        "details about the required content information about payment and how long the campaign lasts" +
                        "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
        "contentGuideline": "Content guideline: Say in the video i love the product, make it 60 seconds, add hashtag loveit, integrate it seamlessly into yout  content",
        "maxFee": 5,
        "minFee": 1,
        "favorited": null,
        "pitches": [
            {
                "id": 1,
                "creatorId": "username1",
                "title": "Test pitch title",
                "text": "Test pitch text"
            }
        ]
    }
  });
  private devPitchListResponse: Observable<any> = of(
    {
      "pitches": [
          {
              "id": 1,
              "creatorId": "username",
              "title": "Test pitch title",
              "text": "Test pitch text"
          },
          {
            "id": 2,
            "creatorId": "username",
            "title": "Test pitch title2",
            "text": "Test pitch text2"
        }
      ]
    });
  private devCampagneListResponse: Observable<any> = of(
    {
      "campaigns": [{
        "id":"0",
        "userId": "username",
        "title":"Porche new model",
        "description":"Porche new model beeing released we need...",
        "minFee":"2000",
        "maxFee":"3000", 
        "favorited": false,
        "pitches": [
          {id: 0, owner:{name: "Mrtn", reach:"3M followers", mainSocialMedia:"tiktok.com/mrtn"}, description:"Csinálnék egy tiktok videót ahol mindenki látná, hogy milyen jó vagyok"},
          {id: 1, owner:{name: "Daposi", reach:"500k followers", mainSocialMedia:"instagram.com/daprosti"}, description:"Felraknám facebook-re egy bejegyzést"},
        ]
      },
      {
        "id":"1",
        "userId": "username",
        "title":"Mol price drop",
        "description":"Mol lowered its prices and we need people to be aware...",
        "minFee":"2000",
        "maxFee":"3000",
        "favorited": false
      },
      {
        "id":"2",
        "userId": "username",
        "title":"Hell new product",
        "description":"Hell is releasing a new product called Hell Water...",
        "minFee":"2000",
        "maxFee":"3000",
        "favorited": true
      },
      {
        "id":"3",
        "userId": "username",
        "title":"Hell new product",
        "description":"Hell is releasing a new product called Hell Water...",
        "minFee":"2000",
        "maxFee":"3000",
        "favorited": true
      },
      {
        "id":"4",
        "userId": "username",
        "title":"Hell new product",
        "description":"Hell is releasing a new product called Hell Water...",
        "minFee":"2000",
        "maxFee":"3000",
        "favorited": true
      },
      {
        "id":"5",
        "userId": "username",
        "title":"Hell new product",
        "description":"Hell is releasing a new product called Hell Water...",
        "minFee":"2000",
        "maxFee":"3000",
        "favorited": true
      },
      {
        "id":"6",
        "userId": "username",
        "title":"Hell new product",
        "description":"Hell is releasing a new product called Hell Water...",
        "minFee":"2000",
        "maxFee":"3000",
        "favorited": true
      },
      {
        "id":"7",
        "userId": "username",
        "title":"Hell new product",
        "description":"Hell is releasing a new product called Hell Water...",
        "minFee":"2000",
        "maxFee":"3000",
        "favorited": true
      }
      ]
    }
  );
  

  constructor(private http: HttpClient) {}

  getAllCampagnes(): Observable<{ campaigns: any[] }> {
    if(this.dev) {
      return this.devCampagneListResponse;
    }
    return this.http.get<{ campaigns: any[] }>(this.baseUrl + "/api/v1/campaigns");
  }

  getCampagneById(id: string): Observable<{ campaign: any }> {
    if(this.dev) {
      return this.devCampagneResponse;
    }
    return this.http.get<{ campaign: any }>(`${this.baseUrl}/api/v1/campaigns/${id}`);
  }

  getMyCampagnes(): Observable<{ campaigns: any[] }> {
    if(this.dev) {
      return this.devCampagneListResponse;
    }
    return this.http.get<{ campaigns: any[] }>(`${this.baseUrl}/api/v1/campaigns/user`);
  }

  getSavedCampagnes(): Observable<{ campaigns: any[] }> {
    if(this.dev) {
      return this.devCampagneListResponse;
    }
    return this.http.get<{ campaigns: any[] }>(`${this.baseUrl}/api/v1/campaigns/saved`);
  }

  getPitchById(id: string) {
    if(this.dev) {
      return this.devPitchResponse;
    }
    return this.http.get<{ pitch: any }>(`${this.baseUrl}/api/v1/campaigns/pitches/${id}`);
  }

  getMyPitches() {
    if(this.dev) {
      return this.devPitchListResponse;
    }
    return this.http.get<{ pitches: any }>(`${this.baseUrl}/api/v1/campaigns/pitches/user`);
  }
}
