import { Component, OnInit } from '@angular/core';
import { RutasService } from 'src/app/administracion/services/rutas.service';
import { Subject } from 'rxjs';
import { PaqueteService } from '../../../services/paquete.service';

@Component({
  selector: 'app-ver-rutas',
  templateUrl: './ver-rutas.component.html',
  styleUrls: ['./ver-rutas.component.css']
})
export class VerRutasComponent implements OnInit {

  public data: any[]=[];

  public activos: any[]=[];

  constructor(private rutaService: PaqueteService){

  }
  ngOnInit(): void {    
   
    this.rutaService.listar().subscribe((data:any)=>{
      this.data = data;  
      
      
      for (const activo of this.data) {
        if(activo.estado==="ACTIVO"){
          this.activos.push(activo);
         
        }      
      }      
    })
    
  } 

}
