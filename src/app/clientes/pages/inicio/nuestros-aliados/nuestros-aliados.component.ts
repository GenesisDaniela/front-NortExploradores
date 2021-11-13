import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../../../services/empresa.service';

@Component({
  selector: 'app-nuestros-aliados',
  templateUrl: './nuestros-aliados.component.html',
  styleUrls: ['./nuestros-aliados.component.css']
})
export class NuestrosAliadosComponent implements OnInit {

  constructor(private empresas: EmpresaService) { }
  data: any[]=[];

  ngOnInit(): void {
    this.empresas.listarEmpresa().subscribe(empresa=>{
      this.data=empresa;
    })
  }



}
