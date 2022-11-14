import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crudheroes-dfedd-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  crearHeroe( heroe:HeroeModel ){


    return this.http.post(`${this.url}/heroes.json`, heroe);

  }


}
