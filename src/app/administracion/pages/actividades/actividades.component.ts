import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import { Subject } from 'rxjs';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  deshabilitado=false;
  size: NzButtonSize = 'large';
  dtOptions: DataTables.Settings = {};
  
  dtTrigger = new Subject<any>();
  public data: any[]=[];

  constructor(private httpClient: ActividadesService){

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language:{
        url:"//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"
      }
    };
    this.httpClient.listarActividad().subscribe((data:any)=>{
      this.data = data;
      this.dtTrigger.next();
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  deshabilitar(id:any){
    this.httpClient.desabilitar(id).subscribe((data) => {  
      console.log(id);
      
    });
  }

}
