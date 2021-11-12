import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlojamientosService } from 'src/app/administracion/services/alojamientos.service';
import { PaquetesService } from 'src/app/administracion/services/paquetes.service';
import { ActividadesService } from 'src/app/administracion/services/actividades.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-paquete',
  templateUrl: './add-paquete.component.html',
  styleUrls: ['./add-paquete.component.css']
})
export class AddPaqueteComponent implements OnInit {

  public alojamientos: any = [];
  public actividades: any=[];
  public form!: FormGroup;
  titulo = 'Agregar Paquete';
  boton = 'Agregar Paquete';
  id: string | null;

  constructor(
    private alojamientoservice: AlojamientosService,
    private actividadService: ActividadesService,
    private paqueteService: PaquetesService,
    private formBuilder: FormBuilder,
    private router : Router,
    private aRouter: ActivatedRoute
  ) { 
    this.id = aRouter.snapshot.paramMap.get('idPaq');
  }

  ngOnInit(): void {
    this.esEditar();
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
    if(this.id !== null){
     this.paqueteService.editarPaquete(this.id, this.form.value).subscribe((data) => {
      this.router.navigate(["/administracion/paquetes"]);
     });
        
   }else {
    this.paqueteService.post(this.form.value).subscribe(paquete=>{
      
      this.paqueteService.postAct(this.getActividades.value, paquete.idPaq).subscribe(data=>{
        this.router.navigate(["/administracion/paquetes"]);})
      })
   }
   }

   esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Paquete';
      this.boton = 'Editar Paquete';
      this.paqueteService.obtenerPaquete(this.id).subscribe((data) => {
        this.form.setValue({
          precio: data.precio,
          estado: data.estado,
          urlImagen: data.urlImagen,
          descripcion: data.descripcion,
          recomendacion: data.recomendacion,
          nombre: data.nombre,
          alojamiento: data.alojamiento,
          acts: data.acts,
        });
      });
    }
  }

   
}
