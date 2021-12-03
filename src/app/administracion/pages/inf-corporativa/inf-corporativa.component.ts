import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CargosService } from '../../services/cargos.service';
import { EmpresaService } from '../../../services/empresa.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inf-corporativa',
  templateUrl: './inf-corporativa.component.html',
  styleUrls: ['./inf-corporativa.component.css']
})
export class InfCorporativaComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  
  dtTrigger = new Subject<any>();
  info: any=[];

  constructor(private empresa : EmpresaService,
    private tokenS: TokenService,
    private router: Router){

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language:{
        url:"//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"
      }
    };

    this.empresa.obtenerEmpresa("84950").subscribe(data=>{
      console.log(data);
      this.info = data;
      this.dtTrigger.next();
    });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
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
