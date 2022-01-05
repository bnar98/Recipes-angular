import { Component, DoCheck, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('inputName') nameInput: ElementRef | undefined;
  @ViewChild('inputAmount') AmountInput: ElementRef | undefined;
  constructor(private shoppingService: ShoppingListService) { }


  ngOnInit(): void {
  }
  addItem() {
    const newIngredient = new Ingredient(this.nameInput?.nativeElement.value, this.AmountInput?.nativeElement.value)
    this.shoppingService.addIngrediant(newIngredient);
  }
}
