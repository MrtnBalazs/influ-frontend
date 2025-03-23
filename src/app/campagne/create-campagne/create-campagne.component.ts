import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Campagne } from '../../service/campagne/campagne';
import { CampagneService } from '../../service/campagne/campagne.service';


@Component({
  selector: 'app-create-campagne',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-campagne.component.html',
  styleUrl: './create-campagne.component.css'
})
export class CreateCampagneComponent {
  //campagneService = inject(CampagneService);
  campagneToSave = new Campagne("", "", "", "", "");

  constructor(private campagneService: CampagneService) {}

  createCampagne() {
      console.log("Save new campagne.");
      //this.campagneService.saveCampagne(this.campagneToSave);
  }
}
