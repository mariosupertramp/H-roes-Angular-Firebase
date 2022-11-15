import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crudheroes-dfedd-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}


  actualizarHeroe( heroe: HeroeModel){


    const heroeTemp ={
      ...heroe
    }

    delete heroeTemp.id;
  
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);

  }


  crearHeroe( heroe:HeroeModel ){
  
    return this.http.post(`${this.url}/heroes.json`, heroe)
           .pipe( 
             map((resp:any)=>{
              heroe.id = resp.name;
              return heroe;
             })
           );   
}


// Aquí hay que hacer carpinteria para recibir los datos de Firebase
getHeroes(){

  return this.http.get(`${this.url}/heroes.json`)
  .pipe(
    map(resp => this.crearArreglo(resp))
  );
}




private crearArreglo (heroesObj: any){

const heroes : HeroeModel[] = [];

if(heroesObj === null){return [];}

Object.keys( heroesObj ).forEach( key => {
  const heroe:HeroeModel = heroesObj[key];
  heroe.id = key;
  heroes.push( heroe );
});

return heroes;
}









}
