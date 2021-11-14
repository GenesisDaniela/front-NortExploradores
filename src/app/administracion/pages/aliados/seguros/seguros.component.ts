import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Subject } from 'rxjs';
import { SegurosService } from '../../../services/seguros.service';

@Component({
  selector: 'app-seguros',
  templateUrl: './seguros.component.html',
  styleUrls: ['./seguros.component.css']
})
export class SegurosComponent implements OnInit {

  size: NzButtonSize = 'large';
  dtOptions: DataTables.Settings = {};
  
  dtTrigger = new Subject<any>();
  public data: any[]=[];

  constructor(private seguros : SegurosService) { 

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language:{
        url:"//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"
      }
    };
    this.seguros.listarSeguro().subscribe((data:any)=>{
      this.data = data;
      this.dtTrigger.next();
    })
  }

  deshabilitar(id:any){
    this.seguros.deshabilitar(id).subscribe((data) => {  
      console.log(id);
      
    });
  }

}
