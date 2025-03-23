import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Campagne } from '../../service/campagne/campagne';
import { CampagneService } from '../../service/campagne/campagne.service';
import { OnInit } from '../../../../node_modules/@angular/core/index';

@Component({
  selector: 'app-campagne-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './campagne-list.component.html',
  styleUrl: './campagne-list.component.css'
})
export class CampagneListComponent implements OnInit {
  @Input() campagnes: any[] = [];
  //campagnes !: Campagne[];
  //campagneService = inject(CampagneService);
  
  ngOnInit() {
    //this.campagnes = this.campagneService.getCampages();
  }

  constructor(private campagneService: CampagneService) {
    //this.campagnes = this.campagneService.getCampages();
  }
}
