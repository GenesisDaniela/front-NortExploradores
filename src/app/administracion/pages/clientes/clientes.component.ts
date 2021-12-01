import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { ClientesService } from '../../services/clientes.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  size: NzButtonSize = 'large';
  dtOptions: DataTables.Settings = {};
  
  dtTrigger = new Subject<any>();
  public data: any[]=[];

  constructor(private httpClient: ClientesService , private toastr: ToastrService){

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language:{
        url:"//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"
      }
    };
    this.httpClient.listarCliente().subscribe((data:any)=>{
      this.data = data;
      this.dtTrigger.next();
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  deshabilitar(id:any){
    this.httpClient.deshabilitar(id).subscribe((data) => {
      this.toastr.success("Pasajero Deshabilitado con exito", "", {
        positionClass: 'toast-bottom-right' 
      })
     
    }); 

  }

  habilitar(id:any){
    this.httpClient.habilitar(id).subscribe((data) => {
      this.toastr.success("Pasajero Habilitado con exito", "", {
      positionClass: 'toast-bottom-right'
    })
    
  });
  }

//   window.location.reload();
// 
}