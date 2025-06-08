import { Component } from '@angular/core';
import { CampagneService } from '../service/campagne/campagne.service';
import { MultipleSelectorPopupComponent } from "../common/multiple-selector-popup/multiple-selector-popup.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MultipleSelectorPopupComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  contentTypes = ["lifestyle", "car", "pet", "horse", "dog", "gaming", "gambling", "sport"]
}
