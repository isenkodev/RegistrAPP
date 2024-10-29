import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; 
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  
  email: string = '';
  pass: string = '';

  constructor(private firebase: FirebaseService, private router: Router, private alertController: AlertController) {}

  ngOnInit() {  
  }

  async recuperar() {
    if (!this.email) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se ha ingresado datos, vuelve a intentarlo.',
        buttons: ['OK'],
      });
      await alert.present();
      return; 
    }


    if (!this.email.endsWith('@gmail.com')) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Debes ingresar un correo válido que contenga @gmail.com',
        buttons: ['OK'],
      });
      await alert.present();
      return; 
    }

    let usuario = await this.firebase.recuperar(this.email);
    console.log(usuario);

    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Se ha enviado un correo para restablecer contraseña',
      buttons: ['OK'],
    });

    await alert.present();
    this.router.navigateByUrl("login");
  }
}
