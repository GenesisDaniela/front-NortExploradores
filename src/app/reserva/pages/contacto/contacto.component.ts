import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpresaService } from '../../../services/empresa.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  data: any[] = [];
  tel: any;
  email:any;

  constructor(private httpClient: EmpresaService) { }

  ngOnInit(): void {
    this.httpClient.obtenerEmpresa("84950").subscribe((data:any)=>{
      this.data = data; 
      this.tel = data.telefono;
      this.email = data.correo;     
    })
  }

}
