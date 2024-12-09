import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { LoginServiceService } from '../service/login.service.service';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  pass: string = '';

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,  // Importamos AlertController
    private loginService: LoginServiceService,
    private firebase: FirebaseService
  ) {}

  // Método para login
  async login() {
    try {
      let usuario = await this.firebase.auth(this.email, this.pass);

      if (usuario) {
        // Llamada al servicio de login
        this.loginService.login();

        // Verificar si es el usuario admin
        if (this.email === 'admin@duocuc.cl') {
          // Redirige a la página de administración
          this.router.navigate(['/registrarad']);
        } else {
          // Redirige a la página principal
          this.router.navigate(['/home']);
        }

        // Mostrar mensaje de éxito con toast
        await this.toastMessage('Usuario y contraseña válidos', 'success');
      } else {
        // Mostrar mensaje de error si las credenciales no son válidas
        await this.toastMessage('Usuario o contraseña incorrectos, inténtelo de nuevo.', 'danger');
      }
    } catch (error) {
      console.error(error);
      this.toastMessage('Hubo un error al autenticar el usuario.', 'danger');
    }
  }

  // Método para mostrar toast
  async toastMessage(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,  // Duración del toast (en milisegundos)
      position: 'top',  // Posición del toast (puede ser 'top', 'bottom', 'middle')
      color: color  // Color del toast ('success', 'danger', etc.)
    });
    toast.present();
  }

  // Método para cerrar sesión
  async logout() {
    try {
      // Lógica para cerrar sesión, por ejemplo:
      await this.firebase.logout();  // Suponiendo que tienes un método logout en tu servicio Firebase

      // Mostrar alerta de cierre de sesión
      const alert = await this.alertController.create({
        header: 'Sesión Cerrada',
        message: 'Has cerrado sesión correctamente.',
        buttons: ['OK']
      });

      await alert.present();

      // Redirige a la página de login o cualquier otra página
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      this.toastMessage('Hubo un problema al cerrar sesión.', 'danger');
    }
  }
}
