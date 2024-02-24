// responsive-toolbar.component.ts

import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.css'],
})
export class ResponsiveToolbarComponent {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  @Output() toggleSidenav = new EventEmitter<void>(); // Event yarat

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  emitToggleSidenav() {
    this.toggleSidenav.emit(); // Event'i tetikle
  }
  handleLogout() {
    this.authService.logOut().subscribe({
      next: (response) => {
        if (response.success) {
          localStorage.removeItem('token');
          this.toastrService.success(response.message || 'Çıkış başarılı');
          this.router.navigate(['login']);
        } else {
          this.toastrService.error(response.message || 'Oturum kapatılamadı');
        }
      },
      error: (error) => {
        console.error('Error during logout:', error);
        this.toastrService.error(
          'Oturum kapatma sırasında bir hata oluştu. Lütfen tekrar deneyin.'
        );
      },
    });
  }
}
