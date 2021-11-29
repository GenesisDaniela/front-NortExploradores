import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../../../services/empresa.service';

@Component({
  selector: 'app-nuestros-aliados',
  templateUrl: './nuestros-aliados.component.html',
  styleUrls: ['./nuestros-aliados.component.css']
})
export class NuestrosAliadosComponent implements OnInit {

  constructor(private empresas: EmpresaService) { }
  seguros: any[]=[];
  transportes : any[]=[];

  ngOnInit(): void {
    // this.empresas.listarEmpresa().subscribe(empresa=>{
    //   this.data=empresa;
    // })

    this.empresas.listarTransportes().subscribe(transportes=>{
      this.transportes=transportes;
    })

    this.empresas.listarSeguros().subscribe(data=>{
      this.seguros=data;
    })
  }



}
