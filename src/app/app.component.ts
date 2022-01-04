import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  feuture = "recipe";
  title = 'Recipes-angular';
  test: boolean = false;
  onselect(event: any) {
    this.feuture = event;
  }

}
