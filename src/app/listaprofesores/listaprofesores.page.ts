import { Component, OnInit } from '@angular/core';
import { RamApiService } from '../service/ram-api.service'; 
import { Character } from '../models/character'; 
import { NavController } from '@ionic/angular'; 

@Component({
  selector: 'app-listaprofesores',
  templateUrl: './listaprofesores.page.html',
  styleUrls: ['./listaprofesores.page.scss'],
})
export class ListaprofesoresPage implements OnInit {
  characterIds: number[] = [127, 241, 256, 242, 243, 107];
  charactersDetails: Character[] = [];  

  constructor(
    private ramApiService: RamApiService, 
    private navCtrl: NavController  
  ) {}

  ngOnInit() {
    this.ramApiService.getCharactersByIds(this.characterIds).subscribe({
      next: (characters: Character[]) => { 
        console.log('Personajes recibidos:', characters); 
        if (characters.length > 0) {
          this.charactersDetails = characters; 
        } else {
          console.warn("No se encontraron detalles para los personajes.");
          this.setDefaultCharacters(); 
        }
      },
      error: (err) => {
        console.error("Error al obtener los detalles de los personajes", err);
        this.setDefaultCharacters(); 
      }
    });
  }

  goBack() {
    this.navCtrl.back(); 
  }

  private setDefaultCharacters() {
    this.charactersDetails = [
      {
        id: 127,
        name: "Rick Sanchez",
        gender: "Male",
        status: "Alive",
        species: "Human",
        image: "https://rickandmortyapi.com/api/character/avatar/127.jpeg"
      },
      {
        id: 241,
        name: "Morty Smith",
        gender: "Male",
        status: "Alive",
        species: "Human",
        image: "https://rickandmortyapi.com/api/character/avatar/241.jpeg"
      },
      {
        id: 256,
        name: "Summer Smith",
        gender: "Female",
        status: "Alive",
        species: "Human",
        image: "https://rickandmortyapi.com/api/character/avatar/256.jpeg"
      },
      {
        id: 242,
        name: "Beth Smith",
        gender: "Female",
        status: "Alive",
        species: "Human",
        image: "https://rickandmortyapi.com/api/character/avatar/242.jpeg"
      },
      {
        id: 243,
        name: "Jerry Smith",
        gender: "Male",
        status: "Alive",
        species: "Human",
        image: "https://rickandmortyapi.com/api/character/avatar/243.jpeg"
      },
      {
        id: 107,
        name: "Birdperson",
        gender: "Male",
        status: "Alive",
        species: "Birdperson",
        image: "https://rickandmortyapi.com/api/character/avatar/107.jpeg"
      }
    ];
    console.log("Se configuraron personajes por defecto:", this.charactersDetails);
  }
}

