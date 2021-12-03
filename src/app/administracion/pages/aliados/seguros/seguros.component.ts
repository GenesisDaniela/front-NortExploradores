import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Subject } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
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

  constructor(private seguros : SegurosService,
    private tokenS:TokenService,
    private router : Router,
    ) { 

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
    this.seguros.listarSeguro().subscribe((data:any)=>{
      this.data = data;
      this.dtTrigger.next();
    })
  }

  // deshabilitar(id:any){
  //   this.seguros.deshabilitar(id).subscribe((data) => {  
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
