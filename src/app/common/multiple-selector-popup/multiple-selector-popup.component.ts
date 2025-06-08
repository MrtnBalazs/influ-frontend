import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-multiple-selector-popup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './multiple-selector-popup.component.html',
  styleUrl: './multiple-selector-popup.component.css'
})
export class MultipleSelectorPopupComponent implements OnInit{
  @Input() inputItems: string[] = [];
  @Input() typeOfItems = "";
  @Input() maxConstraint = 5;
  @Input() minConstraint = 1;
  searchText: string = "";
  selectedItems: string[] = [];
  items: {color: any, value: string}[] = [];
    
  ngOnInit(): void {
    this.inputItems.forEach((item) => this.items.push({color: this.getRandomColor(), value: item}))
    this.items.sort((a, b) => a.value < b.value ? -1 : 1);
  }

  getFilteredItems() {
    return this.items.filter(
      (value) => 
        value.value.startsWith(this.searchText) &&
       !this.selectedItems.find(selectedValue => selectedValue === value.value)
    );
  }

  selectItem(itemValue: string) {
    if(this.selectedItems.length < this.maxConstraint) {
      this.selectedItems.push(itemValue);
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
