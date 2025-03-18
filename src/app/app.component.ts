import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CampagneService } from './service/campagne/campagne.service';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  campagneService = inject(CampagneService);
  title = 'influ-frontend';
}
