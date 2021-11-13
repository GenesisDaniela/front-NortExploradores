import { Component, OnInit } from '@angular/core';

import { PaqueteService } from 'src/app/services/paquete.service';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-pasadia',
  templateUrl: './pasadia.component.html',
  styleUrls: ['./pasadia.component.css']
})
export class PasadiaComponent implements OnInit {

  constructor(
    private paqueteService:PaqueteService,
    private tourService:TourService
    ) { }

  paquetes:any =[];
  tours: any= [];

  ngOnInit(): void {
    this.listarPaquetes();
    this.listarTour();
  }


  public listarTour(){
    this.tourService.listarTourActivo().subscribe(tour=>{
      this.tours=tour
    })
  }

  public listarPaquetes(){
    this.paqueteService.listarPaqPasadia().subscribe(listaPaquetes=>{
      this.paquetes = listaPaquetes;
    })
  }


}
