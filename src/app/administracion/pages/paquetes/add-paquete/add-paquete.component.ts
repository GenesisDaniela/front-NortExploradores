import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlojamientosService } from 'src/app/administracion/services/alojamientos.service';
import { PaquetesService } from 'src/app/administracion/services/paquetes.service';
import { ActividadesService } from 'src/app/administracion/services/actividades.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MunicipioService } from 'src/app/administracion/services/municipio.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-paquete',
  templateUrl: './add-paquete.component.html',
  styleUrls: ['./add-paquete.component.css']
})

export class AddPaqueteComponent implements OnInit {

  public alojamientos: any = [];
  public municipios: any = [];
  public actividades: any=[];
  public form!: FormGroup;
  titulo = 'Agregar Paquete';
  boton = 'Agregar Paquete';
  id: string | null;


  constructor(
    private alojamientoservice: AlojamientosService,
    private municipioService: MunicipioService,
    private actividadService: ActividadesService,
    private paqueteService: PaquetesService,
    private formBuilder: FormBuilder,
    private router : Router,
    private aRouter: ActivatedRoute,
    private toastr: ToastrService
  ) { 
    this.id = aRouter.snapshot.paramMap.get('idPaq');
  }

  ngOnInit(): void {
  
    this.agregarAlojamiento();
    this.agregarMunicipio();
    this.form=this.formBuilder.group({
      idPaq:['', Validators.required],
      precio:['', 
        Validators.compose([
          Validators.required, 
          Validators.min(1000), 
          Validators.maxLength(1000000)])],
      estado:['', Validators.required],
      urlImagen:['', Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255)
      ])],
      descripcion:['', 
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(255)
      ])],
      recomendacion:['', 
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255)])],
      nombre:['', 
        Validators.compose([
          Validators.required, 
          Validators.minLength(3),
          Validators.maxLength(20)])],
      alojamiento:['', Validators.required],
      municipio:['', Validators.required],
      acts: this.formBuilder.array([])
    });
  
}

  public agregarAlojamiento() {
    this.alojamientoservice.listarAlojamiento().subscribe(alojamientos => {
      this.alojamientos = alojamientos;
    })
  }

  public agregarMunicipio() {
    this.municipioService.listarMunicipio().subscribe(municipios => {
      this.municipios = municipios;
    })
  }

  public cargarActividades(evento: any){
    
    let totalAct = evento.target.value;
    let actividadess = this.form.get('acts') as FormArray;
    actividadess.clear();

    for (let i = 0; i < totalAct; i++) {
      actividadess.push(
        this.formBuilder.group({
          nombre: ['', Validators.required],
          descripcion: ['', Validators.required], 
          urlImg: ['', Validators.required],
          paquete: [null, Validators.required]
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
    if (!this.form.valid) {
      this.toastr.error('¡Datos incorrectos!', 'ERROR', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      return;
    }
   
    console.log('actssss', this.getActividades.value);
    this.paqueteService.post(this.form.value).subscribe(paquete=>{
      console.log(paquete);
      this.paqueteService.postAct(this.getActividades.value, paquete.idPaq).subscribe(data=>{    this.toastr.success("Paquete Agregado Con Exito!", "Paquete Registrado", {
        positionClass: 'toast-bottom-right'
      })
        this.router.navigate(["/administracion/paquetes"]);})
      })
   
   }

   
}
