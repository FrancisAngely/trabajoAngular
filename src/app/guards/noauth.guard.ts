import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanMatch,
  Router,
  RouterModule,
  Routes,
  UrlSegment,
} from '@angular/router';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate, CanMatch {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() == false) {
      return true;
    } else {
      this.router.navigateByUrl('admin/dashboard');
      return false;
    }
  }
  canMatch(): boolean {
    if (this.authService.isAuthenticated() == false) {
      return true;
    } else {
      //this.router.navigate(['/login']);
      this.router.navigateByUrl('admin/dashboard');
      return false;
    }
  }
}
