import { CanActivateFn, Router } from '@angular/router';
import { LoginServiceService } from '../service/login.service.service'; // Asegúrate de que la ruta sea correcta
import { inject } from '@angular/core';

export const autenticadoGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginServiceService); // Inyección del servicio de login
  const router = inject(Router); // Inyección del Router

  // Verificar si el usuario está autenticado
  const isAuthenticated = loginService.isAuthenticated(); // Método que debe retornar un booleano
  if (!isAuthenticated) {
    // Redirigir al usuario a la página de inicio de sesión si no está autenticado
    router.navigate(['/login']);
  }

  return isAuthenticated; // Permitir o denegar el acceso
};
