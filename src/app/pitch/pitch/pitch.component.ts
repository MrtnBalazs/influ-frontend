import { Component, Input, OnInit, signal } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';

@Component({
  selector: 'app-pitch',
  standalone: true,
  imports: [],
  templateUrl: './pitch.component.html',
  styleUrl: './pitch.component.css'
})
export class PitchComponent{
  pitchId = signal<any | null>(null);
  pitch: any;

  @Input({ transform: (c: any) => c }) 
  set selectedPitch(value: any) {
    if (value) {
      this.pitchId.set(value);
      this.campagneService.getPitchById(this.pitchId()).subscribe((response: { pitch: any }) => {
        this.pitch = response.pitch;
      });
    }
  }

  constructor(private campagneService:CampagneService){}

}
