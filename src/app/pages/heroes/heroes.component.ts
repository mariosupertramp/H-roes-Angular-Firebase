import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

heroes : HeroeModel[]=[];
cargando = false;


  constructor(private heroeService: HeroesService) { }

  ngOnInit(): void {

    this.cargando =true;

    this.heroeService.getHeroes()
    .subscribe(resp =>{
      this.heroes = resp;
      this.cargando = false;
    }
      );
  }



  borrarHeroe( heroe:HeroeModel, i:number){

Swal.fire({
  title: 'está seguro',
  text:`esta seguro que desea borrar a ${heroe.nombre}`,
  showConfirmButton: true,
  showCancelButton: true
}).then(resp =>{

if(resp.value){
  this.heroes.splice(i,1);
  this.heroeService.eliminarHeroe(heroe.id!)
  .subscribe();
}

});
  
  }




}
