import { CanActivateFn, Router } from '@angular/router';
import { LoginServiceService } from '../service/login.service.service'; // Asegúrate de que la ruta sea correcta
import { inject } from '@angular/core';

export const noAutenticadoGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginServiceService); // Inyección del servicio de login
  const router = inject(Router); // Inyección del Router

  // Verificar si el usuario está autenticado
  const isAuthenticated = loginService.isAuthenticated();
  if (isAuthenticated) {
    // Redirigir al usuario a la página de inicio si ya está autenticado
    router.navigate(['/home']);
  }

  return !isAuthenticated; // Permitir el acceso solo si no está autenticado
};
