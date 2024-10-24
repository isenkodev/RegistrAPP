import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {LoginServiceService} from '../service/login.service.service';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint, CapacitorBarcodeScannerTypeHintALLOption } from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string = 'guest';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loginService: LoginServiceService
  ) {
    const state = this.router.getCurrentNavigation()?.extras?.state;
    if (state && state['user']) {
      console.log(`User: ${state['user']}`);
      this.username = state['user'];
    }

    
  }

  onLogout() {
    this.loginService.logout(); // Llama al método de logout
    this.router.navigate(['/login']); // Redirigir al login después de logout
  }

  result: string = ''

  async scan(): Promise<void> {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL
    });
    this.result = result.ScanResult;
  }
}
