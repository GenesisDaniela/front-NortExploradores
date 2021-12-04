import { Component, OnInit } from '@angular/core';
import { AliadosService } from '../../services/aliados.service';
import { Subject } from 'rxjs';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aliados',
  templateUrl: './aliados.component.html',
  styleUrls: ['./aliados.component.css']
})
export class AliadosComponent implements OnInit {

  size: NzButtonSize = 'large';
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  public data: any[]=[];

  constructor(private httpClient: AliadosService,
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
    this.httpClient.listarAliados().subscribe((data:any)=>{
      // this.data = data;
      for (const iterator of data) {
        if(iterator.idEmpresa!=84950){
          this.data.push(iterator)
        }
      }
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