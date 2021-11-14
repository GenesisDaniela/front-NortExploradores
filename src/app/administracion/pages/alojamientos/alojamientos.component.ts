import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AlojamientosService } from '../../services/alojamientos.service';

@Component({
  selector: 'app-alojamientos',
  templateUrl: './alojamientos.component.html',
  styleUrls: ['./alojamientos.component.css']
})
export class AlojamientosComponent implements OnInit {

  size: NzButtonSize = 'large';
  dtOptions: DataTables.Settings = {};
  
  dtTrigger = new Subject<any>();
  public data: any[]=[];

  constructor(private httpClient: AlojamientosService){

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language:{
        url:"//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"
      }
    };
    this.httpClient.listarAlojamiento().subscribe((data:any)=>{
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
