import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../../../services/empresa.service';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.css']
})
export class QuienesSomosComponent implements OnInit {

  data:any;

  constructor(private empresa: EmpresaService) { }

  ngOnInit(): void {
    this.empresa.obtenerEmpresa("1").subscribe(data=>{
      this.data=data;
    })
  }

}
