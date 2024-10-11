import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Campagne } from '../../service/campagne/campagne';
import { CampagneService } from '../../service/campagne/campagne.service';

@Component({
  selector: 'app-campagne-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './campagne-list.component.html',
  styleUrl: './campagne-list.component.css'
})
export class CampagneListComponent {
  campagnes !: Campagne[];
  campagneService = inject(CampagneService);
  
  constructor() {
    this.campagnes = this.campagneService.getCampages();
  }
}
