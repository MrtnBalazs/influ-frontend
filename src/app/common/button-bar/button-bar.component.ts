import { Component, Input } from '@angular/core';
import { Button } from './button';

@Component({
    selector: 'app-button-bar',
    imports: [],
    templateUrl: './button-bar.component.html',
    styleUrl: './button-bar.component.css'
})
export class ButtonBarComponent {
  @Input() buttons: Button[] = [];
  // TODO kell egy button osztály, aminek van színe, neve, meg egy callback fv, és ebből kellene kapnia egy listát
  // sötét zöld ilyen lekerekített alapon kellene rárakni a gombokat, gombok egyenlő távra elosztva

  constructor() {
  }

  onClick(clickedButtonText: string) {
    for(const button of this.buttons) {
      if(clickedButtonText === button.text) {
        button.callbackFn();
      }
    }
  }
}
