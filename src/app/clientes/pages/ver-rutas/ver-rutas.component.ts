import { Component, OnInit } from '@angular/core';
import { RutasService } from 'src/app/administracion/services/rutas.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ver-rutas',
  templateUrl: './ver-rutas.component.html',
  styleUrls: ['./ver-rutas.component.css']
})
export class VerRutasComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  
  dtTrigger = new Subject<any>();
  public data: any[]=[];

  constructor(private rutaService: RutasService){

  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language:{
        url:"//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"
      }
    };
    this.rutaService.listarRuta().subscribe((data:any)=>{
      this.data = data;
      this.dtTrigger.next();
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
