import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Subject } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnDestroy, OnInit {
  size: NzButtonSize = 'large';
  dtOptions: DataTables.Settings = {};

  dtTrigger = new Subject<any>();
  public data: any[]=[];

  constructor(private httpClient: EmpleadosService,
    private router: Router,
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
    this.httpClient.listarEmpleado().subscribe((data:any)=>{
      this.data = data;
      this.dtTrigger.next();
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // deshabilitar(id:any){
  //   this.httpClient.deshabilitar(id).subscribe((data) => {
  //     console.log(id);
  //   });
  // }
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
