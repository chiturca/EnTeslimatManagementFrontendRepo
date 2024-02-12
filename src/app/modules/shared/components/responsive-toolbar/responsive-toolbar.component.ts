// responsive-toolbar.component.ts

import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.css']
})
export class ResponsiveToolbarComponent {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  @Output() toggleSidenav = new EventEmitter<void>(); // Event yarat

  constructor() {}

  emitToggleSidenav() {
    this.toggleSidenav.emit(); // Event'i tetikle
  }
}
