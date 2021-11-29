import { Component, OnInit } from '@angular/core';
import { ToursService } from 'src/app/administracion/services/tours.service';
import { TourService } from '../../../../services/tour.service';

@Component({
  selector: 'app-tours-del-mes',
  templateUrl: './tours-del-mes.component.html',
  styleUrls: ['./tours-del-mes.component.css']
})
export class ToursDelMesComponent implements OnInit {

  data:any;

  constructor(private tour: ToursService) { }

  ngOnInit(): void {
    this.tour.tourDelMes().subscribe(data=>{
      console.log(data);
      this.data =data;
    })
  }



}
