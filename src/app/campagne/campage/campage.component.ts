import { Component } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { Input } from '@angular/core';
import { OnInit } from '../../../../node_modules/@angular/core/index';
import { PitchListComponent } from "../../pitch/pitch-list/pitch-list.component";
import { PitchComponent } from "../../pitch/pitch/pitch.component";
import { signal } from '@angular/core';

@Component({
  selector: 'app-campage',
  standalone: true,
  imports: [PitchListComponent, PitchComponent],
  templateUrl: './campage.component.html',
  styleUrl: './campage.component.css'
})
export class CampageComponent implements OnInit {
  @Input() id: string = "";
  campaign: any = null;
  selectedPitchId = signal<any | null>(null);

  constructor(private campagneService: CampagneService) {}

  onPitchSelected(pitch: any) {
    this.selectedPitchId.set(pitch.id);
  }

  ngOnInit() {
    this.campagneService.getCampagneById(this.id).subscribe((response: { campaign: any }) => {
      this.campaign = response.campaign;
    });
  }
}
