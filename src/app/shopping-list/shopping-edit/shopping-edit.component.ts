import { Component, DoCheck, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ShoppingForm: NgForm | undefined;
  subscription: Subscription | undefined;
  editMode = false;
  editedItemIndex: number | undefined;
  editedItem: Ingredient | undefined;
  constructor(private shoppingService: ShoppingListService) { }



  ngOnInit(): void {
    this.shoppingService.startingEdit
      .subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingService.getIngrediant(index);
        this.ShoppingForm?.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      });
  }
  addItem(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount)
    if (this.editMode && this.editedItemIndex) {
      this.shoppingService.UpdateIngrediat(this.editedItemIndex, newIngredient)
    } else {
      this.shoppingService.addIngrediant(newIngredient);
    }
    this.editMode = false
    form.reset();
  }
  onClear() {
    this.ShoppingForm?.reset();
    this.editMode = false
  }
  onDelete() {
    if (this.editedItemIndex) {
      this.shoppingService.DeleteIngrediant(this.editedItemIndex);
      this.onClear()
    }

  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
