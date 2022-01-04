import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() Select = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  onSelect(type: string) {
    this.Select.emit(type)
  }
}
