import { CanActivateFn, Router } from '@angular/router';
import { LoginServiceService } from '../service/login.service.service';
import { inject } from '@angular/core';

export const autenticadoGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginServiceService);
  const router = inject(Router);
 
  const isAuthenticated = loginService.isAuthenticated(); 

  if (!isAuthenticated) {

    router.navigate(['/login']);
    return false; 
  }

  return true;
};
