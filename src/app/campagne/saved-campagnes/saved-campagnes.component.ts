import { Component } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { CampagneListComponent } from '../campagne-list/campagne-list.component';

@Component({
  selector: 'app-saved-campagnes',
  standalone: true,
  imports: [CampagneListComponent],
  templateUrl: './saved-campagnes.component.html',
  styleUrl: './saved-campagnes.component.css'
})
export class SavedCampagnesComponent {
  savedCampagnes: any[] = [];

  constructor(private campagneService: CampagneService) {}

  ngOnInit(): void {
    this.campagneService.getSavedCampagnes().subscribe((response: { campaigns: any[] }) => {
      this.savedCampagnes = response.campaigns;
    });
  }
}
