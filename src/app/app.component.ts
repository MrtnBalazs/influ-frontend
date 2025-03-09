import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CampagneService } from './service/campagne/campagne.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  campagneService = inject(CampagneService);
  title = 'influ-frontend';
}
