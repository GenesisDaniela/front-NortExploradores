import { Component, OnInit } from '@angular/core';
import { CalificacionService } from '../../../../services/calificacion.service';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css']
})
export class ExperienciasComponent implements OnInit {

  data: any[] = [];

  constructor(private httpClient: CalificacionService) { 
    
  }

  ngOnInit(): void {
    this.httpClient.listar().subscribe((data:any)=>{
      this.data = data;     
    })
  }

}
