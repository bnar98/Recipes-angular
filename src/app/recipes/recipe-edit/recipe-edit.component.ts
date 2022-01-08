import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
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
  constructor(private route: ActivatedRoute,
    private recipeServide: RecipeService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm()
        }
      )
  }
  private initForm() {
    let recipeName = '';
    let recipeDesc = '';
    let recipeimagePath = '';

    if (this.editMode && this.id || this.id === 0) {
      const recipe = this.recipeServide.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDesc = recipe.description;
      recipeimagePath = recipe.imagePath;
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagepath': new FormControl(recipeimagePath),
      'description': new FormControl(recipeDesc)
    })
  }

  onsubmit() {
    console.log(this.recipeForm);
  }

}
