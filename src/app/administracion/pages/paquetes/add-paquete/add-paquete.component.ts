import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlojamientosService } from 'src/app/administracion/services/alojamientos.service';
import { PaquetesService } from 'src/app/administracion/services/paquetes.service';
import { ActividadesService } from 'src/app/administracion/services/actividades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-paquete',
  templateUrl: './add-paquete.component.html',
  styleUrls: ['./add-paquete.component.css']
})
export class AddPaqueteComponent implements OnInit {

  public alojamientos: any = [];
  public actividades: any=[];
  public form!: FormGroup;
  public formAct!: FormGroup;

  constructor(
    private alojamientoservice: AlojamientosService,
    private actividadService: ActividadesService,
    private paqueteService: PaquetesService,
    private formBuilder: FormBuilder,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.agregarAlojamiento();
    this.form=this.formBuilder.group({
      precio:['', Validators.required],
      estado:['', Validators.required],
      urlImagen:['', Validators.required],
      descripcion:['', Validators.required],
      recomendacion:['', Validators.required],
      nombre:['', Validators.required],
      alojamiento:['', Validators.required]
    });
  
  this.formAct=this.formBuilder.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required], 
    urlImg: ['', Validators.required],
    paquete: ['', Validators.required]
  });
}



  public agregarAlojamiento() {
    this.alojamientoservice.listarAlojamiento().subscribe(alojamientos => {
      this.alojamientos = alojamientos;
    })
  }

  
  public enviarData() {
    
    console.log(this.form.value);
    console.log(this.formAct.value);

    this.paqueteService.post(this.form.value).subscribe(paquete=>{
         this.formAct.controls.paquete.setValue(paquete)
         this.actividadService.post(this.formAct.value).subscribe(data=>{
         this.router.navigate(["/administracion/paquetes"]);})
        })  
        
  }

  }
