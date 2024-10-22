import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginServiceService } from '../service/login.service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username!: string;
  password!: string;
  welcomeMessage: string = 'Bienvenido!';

  constructor(
    private router: Router,
    private toastController: ToastController,
    private loginService: LoginServiceService  // Inyectamos el servicio aquí
  ) {}

  validateLogin() {
    const isLoggedIn = this.loginService.login(this.username, this.password);  // Usamos la instancia inyectada
    if (isLoggedIn) {
      this.toastMessage('Usuario y contraseña válidos', 'success');
      // Aquí puedes agregar la navegación si es necesario
      this.router.navigate(['/home']);
    } else {
      this.toastMessage('Usuario o contraseña incorrectos, inténtelo de nuevo.', 'danger');
    }
  }

  async toastMessage(message: string, type: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: type,  // Suponiendo que 'success' y 'danger' son colores válidos en tu tema
      position: 'top'
    });
    toast.present();
  }

  clean(){
    this.username = '';
    this.password = '';
  }
}
