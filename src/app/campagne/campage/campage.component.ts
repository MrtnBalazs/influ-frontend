import { Component } from '@angular/core';
import { CampagneService } from '../../service/campagne/campagne.service';
import { Input } from '@angular/core';
import { OnInit } from '../../../../node_modules/@angular/core/index';

@Component({
  selector: 'app-campage',
  standalone: true,
  imports: [],
  templateUrl: './campage.component.html',
  styleUrl: './campage.component.css'
})
export class CampageComponent implements OnInit {
  @Input() id: string = "";
  campagne: any;

  constructor(private campagneService: CampagneService) {}

  ngOnInit() {
    this.campagneService.getCampagneById(this.id).subscribe(campagne => {
      console.log(campagne)
      this.campagne = campagne;
    });
  }
}
