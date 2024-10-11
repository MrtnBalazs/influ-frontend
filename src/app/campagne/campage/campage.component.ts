import { Component } from '@angular/core';
import {inject} from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { Campagne } from '../../service/campagne/campagne';
import { Input } from '@angular/core';
import { OnInit } from '../../../../node_modules/@angular/core/index';

@Component({
  selector: 'app-campage',
  standalone: true,
  imports: [],
  templateUrl: './campage.component.html',
  styleUrl: './campage.component.css'
})
export class CampageComponent implements OnInit{
  campagneService = inject(CampagneService);
  @Input() id!: string;

  campagne!: Campagne;
  constructor() {
    console.log("Campagne initialized");
  }

  ngOnInit() {
    console.log("Campagne getting campagne: %s", this.id);
    this.campagne = this.campagneService.getCampage(this.id);
  }
}
