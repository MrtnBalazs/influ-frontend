import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-multiple-selector-popup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './multiple-selector-popup.component.html',
  styleUrl: './multiple-selector-popup.component.css'
})
export class MultipleSelectorPopupComponent {
  @Input() items: string[] = ["ok", "dad", "aaa", "ccc", "bbb", "bbddwa", "bjkbja"];
  @Input() typeOfItems = "content type";
  @Input() maxConstraint = 5;
  @Input() minConstraint = 1;
  searchText: string = "";
  selectedItems: string[] = [];

  constructor() {
    this.items.sort((a, b) => a < b ? -1 : 1);
  }

  getFilteredItems() {
    return this.items.filter(
      (value, index, array) => 
        value.startsWith(this.searchText) &&
       !this.selectedItems.find(selectedValue => selectedValue === value)
    );
  }

  selectItem(item: string) {
    if(this.selectedItems.length < this.maxConstraint) {
      this.selectedItems.push(item);
    }
  }

  unselectItem(item: string) {
    this.selectedItems = this.selectedItems.filter((value) => value !== item);
  }

  save() {
    if(this.selectedItems.length <= this.maxConstraint && this.selectedItems.length >= this.minConstraint) {
      console.log("save clicked");
    } else {
      console.log("save clicked, but constraints not matched");
    }
  }

  cancel() {
    console.log("cancel clicked");
  }

  getRandomColor() {
    return `rgb(${this.getRandomNumber(255)},${this.getRandomNumber(255)},${this.getRandomNumber(255)})`;
  }

  getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
  }
}
