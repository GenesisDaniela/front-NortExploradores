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
    private tourService:TourService
    ) { }

  tours: any= [];

  ngOnInit(): void {
    this.listarTour();
  }


  public listarTour(){
    this.tourService.listarTourPasadia().subscribe(tour=>{
      this.tours=tour
    })
  }
}
