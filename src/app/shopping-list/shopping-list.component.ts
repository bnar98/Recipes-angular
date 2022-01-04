import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = []
  constructor() {
    this.ingredients = [{
      'name': 'apple',
      'amount': 5
    },
    {
      'name': 'orange',
      'amount': 7
    }]
  }

  ngOnInit(): void {
  }
  OnIngrediantAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
