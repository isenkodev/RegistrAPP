import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private isLoggedIn: boolean = false; // Estado de autenticación

  constructor(private router: Router) { }

  // Método para iniciar sesión
  login(username: string, password: string): boolean {
    // Aquí defines las credenciales de usuario
    if (username === 'admin' && password === 'admin') {
      this.isLoggedIn = true; // Cambia el estado a autenticado
      const extras: NavigationExtras = {
        state: {
          user: username
        }
      };
      this.router.navigate(['/home'], extras); // Redirige a la página de inicio
      return true;  // Login exitoso
    } else {
      return false;  // Login fallido
    }
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.isLoggedIn; // Retorna el estado de autenticación
  }

  // Método para cerrar sesión
  logout(): void {
    this.isLoggedIn = false; // Cambia el estado a no autenticado
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }
}
