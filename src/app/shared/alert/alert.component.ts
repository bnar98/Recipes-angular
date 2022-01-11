import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() message: string | undefined;
  @Output() closebtn = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  close() {
    this.closebtn.emit();
  }
}
