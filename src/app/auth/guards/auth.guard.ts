import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateFn,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { APP_ROUTES } from '../../../config/routes.config';


  export const authGuard : CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    if (!authService.isAuthenticated()) {
      router.navigate([APP_ROUTES.login]);
      return false;
    }
    return true;
  }

