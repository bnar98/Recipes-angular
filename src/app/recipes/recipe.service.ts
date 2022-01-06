import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [{
    'name': 'test',
    'description': "Lorem Ipsum is simply df type and scrambled it to make a type specimen braset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    'imagePath': "https://images.immediate.co.uk/production/volatile/sites/2/2021/03/Darjeeling-Express-015-403b03c.jpg?webp=true&quality=90&resize=620%2C413",
    'ingrediants': [new Ingredient('meat', 1), new Ingredient('Tomato', 1)]
  }, {
    'name': 'test2',
    'description': "Lorem Ipsum is simply dummy text ofsentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    'imagePath': "https://images.immediate.co.uk/production/volatile/sites/2/2021/03/Darjeeling-Express-015-403b03c.jpg?webp=true&quality=90&resize=620%2C413"
    , 'ingrediants': [new Ingredient('potato', 6), new Ingredient('Tomato', 1)]
  }
  ]
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  constructor(private shoppingServices: ShoppingListService) {

  }
  AddIngrediantToShop(ingrediants: Ingredient[]) {
    this.shoppingServices.addIngrediants(ingrediants);

  }
}
