import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  feuture = 'recipe';
  title = 'Recipes-angular';
  evens = [2, 4, 6, 8, 1];
  test: boolean = false;

  constructor(private authservice: AuthServiceService) { }
  ngOnInit(): void {
    this.authservice.autoLogin();
  }
  onselect(event: any) {
    this.feuture = event;
  }
}
