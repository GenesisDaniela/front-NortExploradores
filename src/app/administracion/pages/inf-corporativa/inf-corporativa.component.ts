import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CargosService } from '../../services/cargos.service';

@Component({
  selector: 'app-inf-corporativa',
  templateUrl: './inf-corporativa.component.html',
  styleUrls: ['./inf-corporativa.component.css']
})
export class InfCorporativaComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  
  dtTrigger = new Subject<any>();
  public data: any[]=[];

  constructor(){

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language:{
        url:"//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"
      }
    };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
