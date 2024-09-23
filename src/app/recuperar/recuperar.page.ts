import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  
  email: string = ''; // Inicializar la variable
  ngOnInit() {
    
  }

  onSubmit(form: NgForm) { 
    if (form.valid) {
      console.log('Correo válido:', this.email);
      this.email = ''; 
      form.resetForm();
    } else {
      console.log('Formulario no válido');
    }
  }
}

