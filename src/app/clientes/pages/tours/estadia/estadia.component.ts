import { Component, OnInit } from '@angular/core';
import { PaqueteService } from 'src/app/services/paquete.service';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-estadia',
  templateUrl: './estadia.component.html',
  styleUrls: ['./estadia.component.css']
})
export class EstadiaComponent implements OnInit {


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
    this.paqueteService.listarPaqEstadia().subscribe(listaPaquetes=>{
      this.paquetes = listaPaquetes;
    })
  }
}
