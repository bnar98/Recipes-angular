import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';
import { User } from '../auth/user.model';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { fromEvent, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private RecipeService: RecipeService,
    private authservice: AuthServiceService
  ) { }

  storeRecipe() {
    const recipes = this.RecipeService.getRecipes();
    return this.http
      .put(
        'https://recipe-b33c2-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((Response) => {
        console.log(Response);
      });
  }
  fetchRecipes() {


    return this.http.get<Recipe[]>(
      'https://recipe-b33c2-default-rtdb.firebaseio.com/recipes.json'
    ).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingrediants: recipe.ingrediants ? recipe.ingrediants : []
          };
        });
      }),
      tap((recipes) => {
        this.RecipeService.setRecipes(recipes);
      })
    )



    // this.http.get<Recipe[]>('https://recipe-b33c2-default-rtdb.firebaseio.com/recipes.json').subscribe(recipes => {
    //   this.RecipeService.setRecipes(recipes);

    // })

  }
}
