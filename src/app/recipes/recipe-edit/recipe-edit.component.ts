import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number | undefined;
  editMode = false;
  recipeForm: FormGroup | undefined;
  test = false;
  constructor(
    private route: ActivatedRoute,
    private recipeServide: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  private initForm() {
    let recipeName = '';
    let recipeDesc = '';
    let recipeimagePath = '';
    let ingrediantsForm = new FormArray([]);

    if ((this.editMode && this.id) || this.id === 0) {
      const recipe = this.recipeServide.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDesc = recipe.description;
      recipeimagePath = recipe.imagePath;
      if (recipe['ingrediants']) {
        for (let ingrediant of recipe.ingrediants) {
          // console.log(ingrediant)
          ingrediantsForm.push(
            new FormGroup({
              name: new FormControl(ingrediant.name),
              amount: new FormControl(ingrediant.amount)
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagepath: new FormControl(recipeimagePath),
      description: new FormControl(recipeDesc),
      ingrediants: ingrediantsForm
    });
    console.log(this.recipeForm);
  }

  onsubmit() {
    console.log(this.recipeForm);
  }
}
