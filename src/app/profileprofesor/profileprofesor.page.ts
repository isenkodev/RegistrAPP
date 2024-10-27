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
  characterId: string | null = null;  // Variable para almacenar el ID del personaje
  characterDetails: Character | null = null;  // Variable para almacenar los detalles del personaje

  constructor(
    private activatedRoute: ActivatedRoute,  // Para obtener el ID del personaje desde la ruta
    private ramApiService: RamApiService,  // Servicio para obtener datos de la API
    private navCtrl: NavController  // Controlador de navegación para volver a la lista
  ) {}

  ngOnInit() {
    // Obtiene el ID del personaje desde la ruta activa
    this.characterId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Character ID:', this.characterId); // Muestra el ID en la consola
    
    if (this.characterId) {
      // Llama al servicio para obtener los detalles del personaje usando el ID
      this.ramApiService.getCharactersByIds([parseInt(this.characterId)]).subscribe({
        next: (characters: Character[]) => { 
          console.log('Received characters:', characters); // Muestra los personajes recibidos
          if (characters.length > 0) {
            this.characterDetails = characters[0]; // Asigna el primer personaje
          } else {
            console.warn("No se encontraron detalles para el personaje con ID:", this.characterId);
          }
        },
        error: (err) => {
          console.error("Error al obtener los detalles del personaje", err);
          this.characterDetails = null; // Limpia los detalles en caso de error
        }
      });
    } else {
      console.warn("No se proporcionó un ID de personaje.");
    }
  }
  
  // Método para regresar a la lista de profesores
  goBack() {
    this.navCtrl.back(); // Regresa a la página anterior
  }
}
