import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];
  @Output() recipeSelectedEdit = new EventEmitter<Recipe>();
  constructor() {
    this.recipes = [{
      'name': 'test',
      'description': "Lorem Ipsum is simply df type and scrambled it to make a type specimen braset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      'imagePath': "https://images.immediate.co.uk/production/volatile/sites/2/2021/03/Darjeeling-Express-015-403b03c.jpg?webp=true&quality=90&resize=620%2C413"
    }, {
      'name': 'test2',
      'description': "Lorem Ipsum is simply dummy text ofsentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      'imagePath': "https://images.immediate.co.uk/production/volatile/sites/2/2021/03/Darjeeling-Express-015-403b03c.jpg?webp=true&quality=90&resize=620%2C413"

    }
    ]
  }

  ngOnInit(): void {
  }
  recipeSelected(recipe: Recipe) {
    this.recipeSelectedEdit.emit(recipe);
  }

}
