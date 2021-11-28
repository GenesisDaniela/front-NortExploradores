import { Component, OnInit } from '@angular/core';
import { CalificacionService } from '../../../../services/calificacion.service';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css']
})
export class ExperienciasComponent implements OnInit {

  data: any[] = [];
  cantidad : string ="";
  // puntuacion1: any="★";
  // puntuacion5: any="★★★★★"
  constructor(private httpClient: CalificacionService) { 
    
  }

  ngOnInit(): void {
    this.httpClient.listar().subscribe(data=>{
      this.data = data;  
         
      console.log("experiencias: ",data);
    })

    
  }

  puntuacion(number: any){
    let puntos =""; 
    if(number==="1"){
       puntos="★" 
    }else if(number==="2"){
      puntos="★★";
    }else if(number==="5"){
      puntos="★★★★★"
    }
    this.cantidad=puntos;
    // return this.cantidad=puntos;
  }

}
