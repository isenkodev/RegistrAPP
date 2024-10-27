import { Component } from '@angular/core';
import { Character } from '../models/character';
import { AlertController, LoadingController } from '@ionic/angular';
import { RamApiService } from '../service/ram-api.service';

@Component({
  selector: 'app-listaprofesores',
  templateUrl: './listaprofesores.page.html',
  styleUrls: ['./listaprofesores.page.scss'],
})
export class ListaprofesoresPage {
  results: Character[] = []; 

  constructor(
    private ramApiService: RamApiService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.getSelectedCharacters(); 
  }

  async getSelectedCharacters() {
    const loading = await this.loadingController.create({
      message: 'Cargando personajes...'
    });
    loading.present();

    const characterIds = [127, 241, 256, 242, 243, 107]; 

    this.ramApiService.getCharactersByIds(characterIds).subscribe({
      next: (data) => {
        console.log("Personajes recibidos:", data);
        this.results = data; 
        loading.dismiss(); 
      },
      error: (error) => {
        console.error("Error al obtener los personajes:", error);
        loading.dismiss();
        this.alertController.create({
          header: 'Error',
          message: 'Error al obtener los personajes',
          buttons: ['OK']
        }).then(alert => alert.present());
      }
    });
  }
}
