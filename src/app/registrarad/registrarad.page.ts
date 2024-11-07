import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../service/firebase.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrarad',
  templateUrl: './registrarad.page.html',
  styleUrls: ['./registrarad.page.scss'],
})
export class RegistraradPage implements OnInit {
  email='';
  pass='';

  constructor(private firebase:FirebaseService,private router: Router, private toastController: ToastController) {}

  ngOnInit() {
  
  }

  async registrar() {
    if (!this.email.endsWith('@duocuc.cl')) {
      this.presentToast('El correo debe ser de dominio @duocuc.cl para registrarse', 'warning');
      return; 
    }
  
    try {
      let usuario = await this.firebase.registrar(this.email, this.pass);
      console.log(usuario);
      
      this.presentToast(`Se ha registrado el alumno: ${this.email}`, 'success');
    } catch (error) {
      console.error(error);
      this.presentToast('Error al registrar el usuario', 'danger');
    }
  }
  
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, 
      color: color,
      position: 'top',
    });
    toast.present();
  }
}