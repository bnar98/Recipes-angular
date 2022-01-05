import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];
  @Output() recipeSelectedEdit = new EventEmitter<Recipe>();
  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

}
