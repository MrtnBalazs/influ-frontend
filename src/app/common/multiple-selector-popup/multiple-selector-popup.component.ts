import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-multiple-selector-popup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './multiple-selector-popup.component.html',
  styleUrl: './multiple-selector-popup.component.css',
  animations: [
      trigger('shake', [
        transition(':enter', [
          animate('100ms ease', style({ transform: 'rotate(0.6deg)' })),
          animate('100ms ease', style({ transform: 'rotate(-0.6deg)' })),
          animate('100ms ease', style({ transform: 'rotate(0deg)' })),
        ])
        ]
      ),
    trigger('bounceInOut', [
      transition(':enter', [
        style({ transform: 'scale(0%)' }),
        animate('250ms ease-out', style({ transform: 'scale(100%)' }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(100%)' }),
        animate('250ms ease-out', style({ transform: 'scale(0%)' }))
      ])
    ])]
})
export class MultipleSelectorPopupComponent implements OnInit{
  @Input() inputItems: string[] = [];
  @Input() inputSelectedItems: string[] = [];
  @Input() typeOfItems = "";
  @Input() maxConstraint = 5;
  @Input() minConstraint = 1;
  @Output() itemsSelected = new EventEmitter<string[]>();
  searchText: string = "";
  selectedItems: string[] = [];
  items: {color: any, value: string}[] = [];
  validationAlertIsTriggered = false;
    
  ngOnInit(): void {
    this.inputItems.forEach((item) => this.items.push({color: this.getRandomColor(), value: item}))
    this.items.sort((a, b) => a.value < b.value ? -1 : 1);
    this.selectedItems = this.inputSelectedItems;
    console.log(this.items);
    console.log(this.selectedItems);
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
      console.log(itemValue);
      this.selectedItems.push(itemValue);
    } else {
      this.triggerValidationAlert();
    }
  }

  unselectItem(item: string) {
    this.selectedItems = this.selectedItems.filter((value) => value !== item);
  }

  save() {
    if(this.validate()){
      this.itemsSelected.emit(this.selectedItems);
      console.log("save clicked");
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

  constraintMatched() {
    return this.selectedItems.length <= this.maxConstraint && this.selectedItems.length >= this.minConstraint;
  }

  validate() :boolean {
    if(!this.constraintMatched()) {
      this.triggerValidationAlert();
      return false;
    }
    return true;
  }

  triggerValidationAlert() {
    this.validationAlertIsTriggered = true;
    setTimeout(() => this.validationAlertIsTriggered = false, 5000);
  }
}
