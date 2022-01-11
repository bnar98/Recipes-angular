import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
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

  constructor(
    private datastorage: DataStorageService,
    private authService: AuthServiceService
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticate = !user ? false : true;
    });
  }
  onsaveData() {
    this.datastorage.storeRecipe();
  }
  fetchRecipe() {
    this.datastorage.fetchRecipes().subscribe();
  }
  logout() {
    console.log("logout")
    this.authService.Logout();
  }
  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
