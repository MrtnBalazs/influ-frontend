import { Component, Input, signal } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { PitchListComponent } from "../pitch-list/pitch-list.component";
import { PitchComponent } from '../pitch/pitch.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-my-pitches',
    imports: [PitchListComponent, PitchListComponent, PitchComponent],
    standalone: true,
    templateUrl: './my-pitches.component.html',
    styleUrl: './my-pitches.component.css',
    animations: [
        trigger('fadeSlideId', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ]
})
export class MyPitchesComponent {
  @Input() title = "";
  myPitches: any[] = [];
  pitchSelected = signal<any | null>(null);

  onPitchSelected(pitch: any) {
    this.pitchSelected.set(pitch.id);
  }

  constructor(private campagneService: CampagneService) {}

  ngOnInit(): void {
    this.campagneService.getMyPitches().subscribe((response: { pitchList: any[] }) => {
      this.myPitches = response.pitchList;
    });
  }
}
