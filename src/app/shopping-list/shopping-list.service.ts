import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingrediantChange = new EventEmitter<Ingredient[]>();
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
  addIngrediant(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingrediantChange.emit(this.ingredients.slice())

  }
  addIngrediants(ingrediants: Ingredient[]) {
    for (let ingredient of ingrediants) {
      this.addIngrediant(ingredient)
    }
  }
  constructor() { }
}
