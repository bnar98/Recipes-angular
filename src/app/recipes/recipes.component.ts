import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  selectRecepie: Recipe | undefined;
  constructor(private recipeServse: RecipeService) { }

  ngOnInit(): void {
    this.recipeServse.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectRecepie = recipe;
    })

  }

}
