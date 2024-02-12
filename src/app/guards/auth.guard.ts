import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../modules/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CheckUserAuthenticationModel } from '../modules/auth/models/check-user-authentication-model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private cookieService: CookieService
  ) {}
  checkUserAuthenticationModel: CheckUserAuthenticationModel = {
    refreshToken: '',
    token: '',
  };

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    let refreshToken = this.cookieService.get('refreshToken');
    let token = localStorage.getItem('token');
    this.checkUserAuthenticationModel = {
      refreshToken: refreshToken,
      token: token!,
    };
    if (!token && !refreshToken) {
      this.toastrService.info('Sisteme giriş yapmalısınız');
      this.router.navigate(['login']);
      return false;
    }

    return new Promise((resolve, reject) => {
      this.authService
        .checkUserAuthentication(this.checkUserAuthenticationModel)
        .subscribe({
          next: (response) => {
            if (response.success) {
              resolve(true);
            } else {
              this.router.navigate(['login']);
              this.toastrService.info('Sisteme giriş yapmalısınız');
              resolve(false);
            }
          },
          error: (err) => {
            this.toastrService.error('Yetkilendirme hatası');
            this.router.navigate(['login']);
            resolve(false);
          },
        });
    });
  }
}
