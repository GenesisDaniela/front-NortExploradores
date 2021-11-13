import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-detalle-tour',
  templateUrl: './detalle-tour.component.html',
  styleUrls: ['./detalle-tour.component.css']
})
export class DetalleTourComponent implements OnInit {

  public tour: any= [];

  constructor(
    private tourService:TourService
  ) { }
  

  ngOnInit(): void {
  }

}
