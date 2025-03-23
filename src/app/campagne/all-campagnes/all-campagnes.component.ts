import { Component } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { CampagneListComponent } from '../campagne-list/campagne-list.component';

@Component({
  selector: 'app-all-campagnes',
  standalone: true,
  imports: [CampagneListComponent],
  templateUrl: './all-campagnes.component.html',
  styleUrl: './all-campagnes.component.css'
})
export class AllCampagnesComponent {
  campagnes: any[] = [];

  constructor(private campagneService: CampagneService) {}

  ngOnInit(): void {
    this.campagneService.getAllCampagnes().subscribe(campagnes => {
      this.campagnes = campagnes;
    });
  }
}
