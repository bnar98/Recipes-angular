import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  selectRecepie: Recipe | undefined;
  constructor() { }

  ngOnInit(): void {

  }
  test() {
    console.log(this.selectRecepie);
  }
}
