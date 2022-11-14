import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private heroeService:HeroesService) { }

  ngOnInit(): void {
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

    Swal.fire(
      this.heroe.nombre,
      'Se actualizó correctamente!',
      'success'
    )

  }

}
