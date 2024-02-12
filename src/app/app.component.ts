import { Component, ViewChild } from '@angular/core';
import { ResponsiveSidenavComponent } from 'src/app/modules/shared/components/responsive-sidenav/responsive-sidenav.component';
import { ResponsiveToolbarComponent } from './modules/shared/components/responsive-toolbar/responsive-toolbar.component';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('responsiveSidenav')
  responsiveSidenav?: ResponsiveSidenavComponent;

  constructor(public authService: AuthService) {}

  toggleSidenav() {
    if (this.responsiveSidenav) {
      this.responsiveSidenav.toggle();
    }
  }
}
