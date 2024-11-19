import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-asigregis',
  templateUrl: './asigregis.page.html',
  styleUrls: ['./asigregis.page.scss'],
})
export class AsigregisPage implements OnInit {

  
  constructor(private navCtrl: NavController) {}

  // Función para navegar a otra página al hacer clic en la tarjeta
  navigateToPage() {
    this.navCtrl.navigateForward('/detalle-pgy1012'); // Cambia '/detalle-pgy1012' por la ruta de la página a la que quieras ir
  }


  ngOnInit() {
  }

}
