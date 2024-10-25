import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RamApiService } from '../service/ram-api.service';
import { Character } from '../models/character';
import { NavController } from '@ionic/angular'; 

@Component({
  selector: 'app-profileprofesor',
  templateUrl: './profileprofesor.page.html',
  styleUrls: ['./profileprofesor.page.scss'],
})
export class ProfileprofesorPage implements OnInit {

  characterId: string | null = null; 
  characterDetails: Character | null = null; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private ramApiService: RamApiService,
    private navCtrl: NavController 
  ) {}

  ngOnInit() {
    this.characterId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.characterId) {
      this.ramApiService.getCharactersByIds([parseInt(this.characterId)]).subscribe({
        next: (characters: Character[]) => { 
          if (characters.length > 0) {
            this.characterDetails = characters[0]; 
          } else {
            console.warn("No se encontraron detalles para el personaje con ID:", this.characterId);
          }
        },
        error: (err) => {
          console.error("Error al obtener los detalles del personaje", err);
        }
      });
    } else {
      console.warn("No se proporcionó un ID de personaje.");
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}
