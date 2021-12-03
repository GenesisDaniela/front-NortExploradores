import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { CargosService } from '../../services/cargos.service';
import { AddCargoComponent } from './add-cargo/add-cargo.component';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  
  dtTrigger = new Subject<any>();
  public data: any[]=[];

  constructor(private httpClient: CargosService,
    private tokenS:TokenService,
    private router : Router,
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
    this.httpClient.listarCargo().subscribe((data:any)=>{
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
