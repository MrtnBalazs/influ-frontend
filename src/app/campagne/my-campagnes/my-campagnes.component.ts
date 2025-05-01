import { Component } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { CampagneListComponent } from "../campagne-list/campagne-list.component";

@Component({
  selector: 'app-my-campagnes',
  standalone: true,
  imports: [CampagneListComponent],
  templateUrl: './my-campagnes.component.html',
  styleUrl: './my-campagnes.component.css'
})
export class MyCampagnesComponent {
  myCampagnes: any[] = [];

  constructor(private campagneService: CampagneService) {}

  ngOnInit(): void {
    this.campagneService.getMyCampagnes().subscribe((response: { campaigns: any[] }) => {
      this.myCampagnes = response.campaigns;
    });
  }
}
