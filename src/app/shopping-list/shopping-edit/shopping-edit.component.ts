import { Component, DoCheck, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('inputName') nameInput: ElementRef | undefined;
  @ViewChild('inputAmount') AmountInput: ElementRef | undefined;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor() { }


  ngOnInit(): void {
  }
  addItem() {
    const newIngredient = new Ingredient(this.nameInput?.nativeElement.value, this.AmountInput?.nativeElement.value)
    this.ingredientAdded.emit(newIngredient);
  }
}
