import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() Select = new EventEmitter<string>();
  private userSub: Subscription | undefined;
  isAuthenticate = false;

  constructor(private datastorage: DataStorageService,
    private authService: AuthServiceService) { }


  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticate = !user ? false : true;
      console.log("yeah")
      console.log(user);
    });

  }
  onsaveData() {
    this.datastorage.storeRecipe();
  }
  fetchRecipe() {
    this.datastorage.fetchRecipes()

  }
  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
