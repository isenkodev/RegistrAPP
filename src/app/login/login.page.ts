import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
    private loginService: LoginServiceService,
    private firebase: FirebaseService,
  ) {}

  async login() {
    try {
      let usuario = await this.firebase.auth(this.email, this.pass);
      if (usuario) {
        this.loginService.login(); 
        this.router.navigate(['/home']); 
      } else {
        this.toastMessage('Error en la autenticación.', 'danger');
      }
    } catch (error) {
      console.error(error);
      this.toastMessage('Error en la autenticación.', 'danger');
    }
  }

  async toastMessage(message: string, type: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: type,
      position: 'top',
    });
    toast.present();
  }
}
