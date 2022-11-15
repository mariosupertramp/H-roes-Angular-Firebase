import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes-service';

import Swal from 'sweetalert2' 

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroeService:HeroesService, private route:ActivatedRoute) { }

  ngOnInit(): void {

const id = this.route.snapshot.paramMap.get('id');

if(id !== 'nuevossss'){
  this.heroeService.getHeroe( id! )
  .subscribe( (resp : any) => {
    this.heroe = resp;
    this.heroe.id = id!;
  });

}
    
  }



  
  guardar(form: NgForm){

    if(form.invalid) {
      console.log('formulario no valido');
      return
    }



Swal.fire({
title: 'Espere',
text: 'Guardando información'
});
Swal.showLoading(Swal.getDenyButton());


let peticion: Observable<any>;

    if(this.heroe.id){

      peticion = this.heroeService.actualizarHeroe(this.heroe);

    }else{

      peticion = this.heroeService.crearHeroe(this.heroe);
      
    }

    peticion.subscribe( resp => {

     Swal.fire(
      this.heroe.nombre,
      'Se actualizó correctamente!',
      'success'
     )

    });

    


  }

}
