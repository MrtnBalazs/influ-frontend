import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CampagneService } from './service/campagne/campagne.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  campagneService = inject(CampagneService);
  title = 'sandbox';
}
