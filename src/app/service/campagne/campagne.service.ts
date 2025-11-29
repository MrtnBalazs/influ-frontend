import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; // import environment

@Injectable({
  providedIn: 'root'
})
export class CampagneService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllCampagnes(): Observable<{ campaignList: [] }> {
    return this.http.get<{ campaignList: [] }>(this.baseUrl + "/api/campaigns");
  }

  getCampagneById(id: string): Observable<{ campaign: any }> {
    return this.http.get<{ campaign: any }>(`${this.baseUrl}/api/campaigns/${id}`);
  }

  getMyCampagnes(): Observable<{ campaignList: [] }> {
    return this.http.get<{ campaignList: [] }>(`${this.baseUrl}/api/campaigns/user`);
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
    return this.http.post(`${this.baseUrl}/api/campaigns/pitches`, pitch);
  }

  saveCampaign(body: any) {
    return this.http.post(`${this.baseUrl}/api/campaigns`, body);
  }
}
