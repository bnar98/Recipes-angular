import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipeSelected.subscribe((recipe: Recipe[]) => {

      this.recipes = recipe

    })
  }

  newRecipeAdd() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
}
