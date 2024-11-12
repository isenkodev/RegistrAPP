import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginServiceService } from '../service/login.service.service';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string = 'guest'; // Valor predeterminado

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loginService: LoginServiceService
  ) {
    // Verificamos si el nombre de usuario fue pasado a través de la navegación
    const state = this.router.getCurrentNavigation()?.extras?.state;
    if (state && state['email']) {
      console.log(`User: ${state['email']}`);
      this.username = state['email']; // Asignamos el valor de 'user' al username
    }
  }

  // Método para cerrar sesión
  onLogout() {
    this.loginService.logout(); 
    this.router.navigate(['/login']); 
  }

  // Método para escanear el código QR
  result: string = ''

  async scan(): Promise<void> {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL
    });
    this.result = result.ScanResult;
  }


}

