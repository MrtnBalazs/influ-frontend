import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pitch-list',
  standalone: true,
  imports: [],
  templateUrl: './pitch-list.component.html',
  styleUrl: './pitch-list.component.css'
})
export class PitchListComponent {
  @Input() pitches: any[] = [];
  @Input() campagneId: any;
  @Output() pitchSelected = new EventEmitter<any>();

  hoveredId: number | null = null; // Store hovered campagne ID

  constructor(){}

  selectPitch(pitch: any) {
    this.pitchSelected.emit(pitch);
  }
}
