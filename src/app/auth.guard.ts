import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService: LoginService = inject(LoginService);
  const router: Router = inject(Router);
  if (loginService.isLoggedIn())
  {
    return true;
  }
  else
  {
    router.navigate(['/login']);
    return false;
  }
};
