import { Component, Input, signal } from '@angular/core';
import { PitchListComponent } from '../pitch-list/pitch-list.component';
import { PitchComponent } from '../pitch/pitch.component';

@Component({
    selector: 'app-pitch-list-detail',
    imports: [PitchListComponent, PitchComponent],
    templateUrl: './pitch-list-detail.component.html',
    styleUrl: './pitch-list-detail.component.css'
})
export class PitchListDetailComponent {
  @Input() pitches: any[] = [];
  selectedPitchId = signal<any | null>(null);

  onPitchSelected(pitch: any) {
    this.selectedPitchId.set(pitch.id);
  }
}
