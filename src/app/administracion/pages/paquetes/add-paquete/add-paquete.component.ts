import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      alojamiento:['', Validators.required],
      acts: this.formBuilder.array([])
    });
  
}



  public agregarAlojamiento() {
    this.alojamientoservice.listarAlojamiento().subscribe(alojamientos => {
      this.alojamientos = alojamientos;
    })
  }
  public cargarActividades(evento: any){
    let totalAct = evento.target.value;
    let actividadess = this.form.get('acts') as FormArray;
    

    for (let i = 0; i < totalAct; i++) {
      actividadess.push(
        this.formBuilder.group({
          nombre: ['', Validators.required],
          descripcion: ['', Validators.required], 
          urlImg: ['', Validators.required],
          paquete: ['', Validators.required]
        })
      )
    }
    console.log(actividadess.value);
    console.log('total acts', totalAct);
  }
  get getActividades(){
    return this.form.get('acts') as FormArray;
  }
  public enviarData() {
    
    console.log('actssss', this.getActividades.value);
    

    this.paqueteService.post(this.form.value).subscribe(paquete=>{
      
      this.paqueteService.postAct(this.getActividades.value, paquete.idPaq).subscribe(data=>{
        this.router.navigate(["/administracion/paquetes"]);})
      })
   }


   
}
