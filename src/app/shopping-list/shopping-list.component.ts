import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  constructor(private ingredientService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.ingredientService.getIngrediants();
    this.ingredientService.ingrediantChange.subscribe(
      (ingredient: Ingredient[]) => {
        this.ingredients = ingredient;
      }
    );
  }
  OnIngrediantAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
  onEdit(index: number) {
    this.ingredientService.startingEdit.next(index);
  }
}
