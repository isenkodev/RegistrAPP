import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class RamApiService {
  private apiUrl = 'https://rickandmortyapi.com/api/character/'; 

  constructor(private http: HttpClient) { }

  getCharacters(pageNumber: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${pageNumber}`);
  }

  getCharactersByIds(ids: number[]): Observable<Character[]> {
    const url = `${this.apiUrl}${ids.join(',')}`; 
    return this.http.get<Character[]>(url);
  }
}
