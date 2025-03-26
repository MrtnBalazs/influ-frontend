import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-campagne-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './campagne-list.component.html',
  styleUrl: './campagne-list.component.css'
})
export class CampagneListComponent {
  @Input() campagnes: any[] = [];
}
