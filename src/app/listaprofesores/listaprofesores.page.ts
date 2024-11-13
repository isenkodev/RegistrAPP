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
  characterIds: number[] = [81, 241, 256, 242, 243, 107];
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
          this.charactersDetails = characters.map((el) => {
            const defaultCharacter = this.setDefaultCharacters().find(c => c.id === el.id);
            return defaultCharacter ? { ...el, name: defaultCharacter.name } : el;
          });
        } else {
          console.warn("No se encontraron detalles para los personajes.");
          this.charactersDetails = this.setDefaultCharacters(); 
        }
      },
      error: (err) => {
        console.error("Error al obtener los detalles de los personajes", err);
        this.charactersDetails = this.setDefaultCharacters(); 
      }
    });
  }

  goBack() {
    this.navCtrl.back(); 
  }

  private setDefaultCharacters(): Character[] {
    return [
      {
        id: 81,
        name: "Carlos Fernando Martinez Sanchez",
        gender: "Male",
        status: "Alive",
        species: "Human",
        image: "https://rickandmortyapi.com/api/character/avatar/81.jpeg"
      },
      {
        id: 241,
        name: "Daniel Enrique Riquelme Rigot",
        gender: "Male",
        status: "Alive",
        species: "Human",
        image: "https://rickandmortyapi.com/api/character/avatar/241.jpeg"
      },
      {
        id: 256,
        name: "Jose Santos Jara Fuentes",
        gender: "Female",
        status: "Alive",
        species: "Human",
        image: "https://rickandmortyapi.com/api/character/avatar/256.jpeg"
      },
      {
        id: 242,
        name: "Leonardo Osvaldo Muñoz Villalón",
        gender: "Female",
        status: "Alive",
        species: "Human",
        image: "https://rickandmortyapi.com/api/character/avatar/242.jpeg"
      },
      {
        id: 243,
        name: "Ernesto Leonardo Velasquez Velasquez",
        gender: "Male",
        status: "Alive",
        species: "Human",
        image: "https://rickandmortyapi.com/api/character/avatar/243.jpeg"
      },
      {
        id: 107,
        name: "Monica Natalia Panes Martinez",
        gender: "Male",
        status: "Alive",
        species: "Birdperson",
        image: "https://rickandmortyapi.com/api/character/avatar/107.jpeg"
      }
    ];
  }
}
