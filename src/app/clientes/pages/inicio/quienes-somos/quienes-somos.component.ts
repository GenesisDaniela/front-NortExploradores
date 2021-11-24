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
      // Muestra muchos errores en consola, porque no se ha cargado aun, cortesia de la casa ;) -San
      const mision = document.getElementById("mision")
      if(mision) mision.innerHTML=data.mision

      const mision2 = document.getElementById("mision2")
      if(mision2) mision2.innerHTML=data.mision
    })
  }

}
