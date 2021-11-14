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
    private tourService:TourService
    ) { }
  tours: any= [];

  ngOnInit(): void {
    this.listarTour();
  }


  public listarTour(){
    this.tourService.listarTourEstadia().subscribe(tour=>{
      this.tours=tour
      console.log(this.tours);
      
    })
  }

}
