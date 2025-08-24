import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampagneService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {
    //this.baseUrl = 'https://8vklq.wiremockapi.cloud';
  }

  getAllCampagnes(): Observable<{ campaignList: any[] }> {
    return this.http.get<{ campaignList: any[] }>(this.baseUrl + "/api/campaigns");
  }

  getCampagneById(id: string): Observable<{ campaign: any }> {
    return this.http.get<{ campaign: any }>(`${this.baseUrl}/api/campaigns/${id}`);
  }

  getMyCampagnes(): Observable<{ campaignList: any[] }> {
    return this.http.get<{ campaignList: any[] }>(`${this.baseUrl}/api/campaigns/user`);
  }

  getPitchById(id: string) {
    return this.http.get<{ pitch: any }>(`${this.baseUrl}/api/campaigns/pitches/${id}`);
  }

  deleteCampaignById(id: string) {
    return this.http.delete(`${this.baseUrl}/api/campaigns/${id}`);
  }

  deletePitchById(id: string) {
    return this.http.delete(`${this.baseUrl}/api/campaigns/pitches/${id}`);
  }

  getMyPitches() {
    return this.http.get<{ pitchList: any[] }>(`${this.baseUrl}/api/campaigns/pitches/user`);
  }

  savePitch(pitch: { title: string; text: string , campaignId: string}) {
    console.log(pitch)
    return this.http.post(`${this.baseUrl}/api/campaigns/pitches`, pitch);
  }

  saveCampaign(body: any) {
    return this.http.post(`${this.baseUrl}/api/campaigns`, body);
  }
}
