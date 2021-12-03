import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { SolicitudpaqueteService } from 'src/app/administracion/services/solicitudpaquete.service';
import { TokenService } from 'src/app/services/token.service';
import { SolicitudComponent } from '../solicitud.component';
@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  size: NzButtonSize = 'large';
  dtOptions: DataTables.Settings = {};
  solicitudes:any[] = [];
  dtTrigger = new Subject<any>();
  constructor(private solicitud:SolicitudpaqueteService,
    private router: Router,
    private tokenS: TokenService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.cargarToken()
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language:{
        url:"//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"
      }
    };
    this.solicitud.listar().subscribe(solicitudes=>{
      this.solicitudes=solicitudes;
      this.dtTrigger.next();
    })
  }

  rechazarSolicitud(idSolicitud:any){
    this.solicitud.rechazarSolicitud(idSolicitud).subscribe(solicitud=>{
      this.toastr.success('Solicitud rechazada correctamente', 'OK', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.eliminarSolicitud(idSolicitud)
      
    },msg=>{
      if(msg.status ==200){
        this.toastr.success('Solicitud rechazada correctamente', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
      this.eliminarSolicitud(idSolicitud)
    })
  }

  eliminarSolicitud(id:any){
    for (let i = 0; i < this.solicitudes.length; i++) {
      if(this.solicitudes[i].idSolicitud == id){
        this.solicitudes.splice(i,1);
      }   
    }
  }

  public cargarToken() {
    if (this.tokenS.getToken()) {
      if(this.tokenS.getAuthorities().length < 2){
      this.router.navigateByUrl("/inicio");
      }
    } else {
      this.router.navigateByUrl("/inicio");
    }
  }
}
