import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Subject } from 'rxjs';
import { SolicitudpaqueteService } from 'src/app/administracion/services/solicitudpaquete.service';
import { SolicitudComponent } from '../solicitud.component';
@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  size: NzButtonSize = 'large';
  dtOptions: DataTables.Settings = {};
  solicitudes:any = [];
  dtTrigger = new Subject<any>();
  constructor(private solicitud:SolicitudpaqueteService) { }

  ngOnInit(): void {
    this.solicitud.listar().subscribe(solicitudes=>{
      this.solicitudes=solicitudes;
    })
  }

}
