import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() Select = new EventEmitter<string>();

  constructor(private datastorage: DataStorageService) { }

  ngOnInit(): void {
  }
  onsaveData() {
    this.datastorage.storeRecipe();
  }
  fetchRecipe() {
    this.datastorage.fetchRecipes()

  }
}
