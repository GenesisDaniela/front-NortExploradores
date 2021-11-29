import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from 'src/app/services/tour.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-tour',
  templateUrl: './detalle-tour.component.html',
  styleUrls: ['./detalle-tour.component.css']
})
export class DetalleTourComponent implements OnInit {

  id: any|null = "";
  data: any;
  url: any;

  constructor(
    private domSanitizer:DomSanitizer,
    private aRoutes: ActivatedRoute, private tour: TourService ) {   this.id = this.aRoutes.snapshot.paramMap.get("idTour");
  }
  

  ngOnInit(): void {
    this.tour.encontrarTour(this.id).subscribe(data => {
      this.data=data;
      this.url = data.paquete.municipio.urlUbicacion;
      this.url = this.domSanitizer.bypassSecurityTrustResourceUrl( this.url)
    })
  }

}
