import { Component } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { Input } from '@angular/core';
import { OnInit } from '../../../../node_modules/@angular/core/index';
import { signal } from '@angular/core';
import { PitchListDetailComponent } from "../../pitch/pitch-list-detail/pitch-list-detail.component";

@Component({
  selector: 'app-campage',
  standalone: true,
  imports: [PitchListDetailComponent],
  templateUrl: './campage.component.html',
  styleUrl: './campage.component.css'
})
export class CampageComponent implements OnInit {
  @Input() id: string = "";
  campaignId = signal<any | null>(null);
  campaign: any = null;
  selectedPitchId = signal<any | null>(null);

  constructor(private campagneService: CampagneService) {}

  @Input({ transform: (c: any) => c }) 
  set selectedCampaign(value: any) {
    console.log("campagne componenet megjött a campaign")
    console.log(value)
    if (value) {
      this.campaignId.set(value);
      this.campagneService.getCampagneById(this.campaignId()).subscribe((response: { campaign: any }) => {
        this.campaign = response.campaign;
        console.log("campaign beállítva");
        console.log(this.campaign);
      });
    }
  }

  onPitchSelected(pitch: any) {
    this.selectedPitchId.set(pitch.id);
  }

  ngOnInit() {
    this.campagneService.getCampagneById(this.id).subscribe((response: { campaign: any }) => {
      this.campaign = response.campaign;
    });
  }
}
