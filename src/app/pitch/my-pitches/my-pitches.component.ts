import { Component } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { PitchListDetailComponent } from '../pitch-list-detail/pitch-list-detail.component';

@Component({
  selector: 'app-my-pitches',
  standalone: true,
  imports: [PitchListDetailComponent],
  templateUrl: './my-pitches.component.html',
  styleUrl: './my-pitches.component.css'
})
export class MyPitchesComponent {
  myPitches: any[] = [];

  constructor(private campagneService: CampagneService) {}

  ngOnInit(): void {
    this.campagneService.getMyPitches().subscribe((response: { pitches: any[] }) => {
      this.myPitches = response.pitches;
    });
  }
}
