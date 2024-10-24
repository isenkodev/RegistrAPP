import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RamGetResponse } from '../models/ram-get-response'; 
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class ApiRickAndMortyService {

  constructor(private http: HttpClient) { }

  getCharacters(pageNumber: number){
    return this.http.get<RamGetResponse>('https://rickandmortyapi.com/api/character?page=' + pageNumber);
  }

  getCharacterById(id: string) {
    return this.http.get<Character>('https://rickandmortyapi.com/api/character/' + id);
  }
}
