import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginServiceService } from '../service/login.service.service';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string = 'guest'; 
  result: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loginService: LoginServiceService
  ) {
    const state = this.router.getCurrentNavigation()?.extras?.state;
    if (state && state['email']) {
      console.log(`User: ${state['email']}`);
      this.username = state['email'];
    }
  }

  // Método para cerrar sesión
  onLogout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  // Método para mostrar alerta de éxito
  async showSuccessMessage() {
    const alert = await this.alertController.create({
      header: '¡Éxito!',
      message: '¡Asistencia registrada con éxito!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Método para escanear el código QR
  async scan(): Promise<void> {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL
    });
    this.result = result.ScanResult;
    
    if (this.result) {
      this.showSuccessMessage();
    }
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  }
}
