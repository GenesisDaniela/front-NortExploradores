import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public empresa: any;
  constructor(
    private empresaService: EmpresaService,
  ) { }

  ngOnInit(): void {
    this.obtenerEmpresa();
  }
  public obtenerEmpresa(){
    this.empresaService.obtenerEmpresa("1").subscribe(data=>{
      this.empresa= data;
    })
  }
}
