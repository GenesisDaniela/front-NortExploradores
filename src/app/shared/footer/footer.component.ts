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
    this.empresaService.obtenerEmpresa("84950").subscribe(data=>{
      this.empresa= data;
      console.log(data.nombre);
      // mismo problema de los errores en consola, solucionados -San
      const nombre = document.getElementById("nombreEmpresa")
      if(nombre) nombre.innerHTML =data.nombre;

      const direccion = document.getElementById("direccionEmpresa")
      if(direccion) direccion.innerHTML =data.direccion;

      const correo = document.getElementById("correoEmpresa")
      if(correo) correo.innerHTML =data.correo;

      const telefono = document.getElementById("telefonoEmpresa")
      if(telefono) telefono.innerHTML =data.telefono;
    })
  }
}
