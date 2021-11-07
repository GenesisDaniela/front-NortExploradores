import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActividadesService } from 'src/app/administracion/services/actividades.service';
import { PaquetesService } from 'src/app/administracion/services/paquetes.service';

@Component({
  selector: 'app-add-actividad',
  templateUrl: './add-actividad.component.html',
  styleUrls: ['./add-actividad.component.css']
})
export class AddActividadComponent implements OnInit {

  public form !: FormGroup;
  public paquetes:any = [];
  constructor(
    private actividadService:ActividadesService,
    private paqueteService:PaquetesService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
   this.agregarPaquete();
    this.form=this.formBuilder.group({ 
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      urlImg: ['', Validators.required],
      paquete:['', Validators.required]
    });
  }


  public agregarPaquete(){
    this.paqueteService.listarPaquete().subscribe(paquetes=>{
      this.paquetes = paquetes; 
    })
  }


  public enviarData(){
    this.actividadService.post(this.form.value).subscribe()
      
  }
}
