import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor() {}

  // Método para iniciar sesión
  login() {
    // Guardamos la sesión del usuario en localStorage
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userEmail', 'user@example.com'); // Guardamos el email o cualquier otro dato
  }

  // Método para cerrar sesión
  logout() {
    // Eliminamos los datos de sesión
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem('userLoggedIn') === 'true';
  }
}
