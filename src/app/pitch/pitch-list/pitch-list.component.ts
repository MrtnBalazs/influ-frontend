import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router:Router){}

  selectPitch(pitch: any) {
    this.pitchSelected.emit(pitch);
  }
}
