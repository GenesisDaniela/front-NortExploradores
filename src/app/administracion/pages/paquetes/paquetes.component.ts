import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { PaquetesService } from '../../services/paquetes.service';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css']
})
export class PaquetesComponent implements OnInit {

  size: NzButtonSize = 'large';
  dtOptions: DataTables.Settings = {};
  
  dtTrigger = new Subject<any>();
  public data: any[]=[];

  constructor(private httpClient: PaquetesService,
    private toastr: ToastrService,
    private router : Router,
    private tokenS: TokenService,
    ){

  }

  ngOnInit(): void {
    this.cargarToken();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language:{
        url:"//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"
      }
    };
    this.httpClient.listarPaquete().subscribe((data:any)=>{
      // this.data = data;
      for (const iterator of data) {
        if(iterator.estado==='ACTIVO' || iterator.estado==='INACTIVO'){
          this.data.push(iterator);
        }
      }
      console.log(this.data);
      this.dtTrigger.next();
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
    deshabilitar(id:any){
    this.httpClient.deshabilitar(id).subscribe((data) => {  
      console.log(id);
    });
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
