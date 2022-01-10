import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private RecipeService: RecipeService) {

  }

  storeRecipe() {
    const recipes = this.RecipeService.getRecipes();
    return this.http.put('https://recipe-b33c2-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(Response => {
      console.log(Response)
    });
  }
  fetchRecipes() {
    this.http.get<Recipe[]>('https://recipe-b33c2-default-rtdb.firebaseio.com/recipes.json').subscribe(recipes => {
      this.RecipeService.setRecipes(recipes);
      // this.RecipeService.add(recipes);

    })
  }
}
