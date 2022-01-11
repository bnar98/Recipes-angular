import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.scss']
})
export class RecipesItemComponent implements OnInit {
  @Input() recipe: Recipe | undefined;
  @Input() index: any | undefined;

  constructor(private recipeServse: RecipeService) {}

  ngOnInit(): void {}
  onSelect() {
    // this.recipeServse.recipeSelected.emit(this.recipe);
  }
}
