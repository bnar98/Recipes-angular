import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingrediantChange = new EventEmitter<Ingredient[]>();
  startingEdit = new Subject<number>();
  ingredients: Ingredient[] = [{
    'name': 'apple',
    'amount': 5
  },
  {
    'name': 'orange',
    'amount': 7
  }]
  getIngrediants() {
    return this.ingredients.slice()
  }
  getIngrediant(index: number) {
    return this.ingredients[index];
  }
  addIngrediant(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingrediantChange.emit(this.ingredients.slice())

  }

  addIngrediants(ingrediants: Ingredient[]) {
    for (let ingredient of ingrediants) {
      this.addIngrediant(ingredient)
    }
  }
  UpdateIngrediat(index: number, ingrediant: Ingredient) {
    this.ingredients[index] = ingrediant;
    this.ingrediantChange.next(this.ingredients.slice())
  }
  DeleteIngrediant(index: number) {
    this.ingredients.splice(index, 1);
    this.ingrediantChange.next(this.ingredients.slice())
  }
  constructor() { }
}
