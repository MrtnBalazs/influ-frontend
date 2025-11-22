import { Component, inject } from '@angular/core';
import { CampagneService } from './service/campagne/campagne.service';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavbarComponent]
})
export class AppComponent {
  campagneService = inject(CampagneService);
  title = 'influ-frontend';
}
