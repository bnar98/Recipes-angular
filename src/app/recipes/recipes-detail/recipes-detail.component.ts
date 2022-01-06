import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.scss']
})
export class RecipesDetailComponent implements OnInit {
  @Input() recipeDetail: Recipe | undefined;
  id: number | undefined;

  ingrediants: Ingredient | undefined;
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']
          this.recipeDetail = this.recipeService.getRecipe(this.id)
        }
      )

  }
  // ToShoppingList() {

  //   if (this.recipeDetail?.ingrediants) {
  //     this.recipeService.AddIngrediantToShop(this.recipeDetail?.ingrediants)
  //     alert("added")
  //   }
  // }
}
