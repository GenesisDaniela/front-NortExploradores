import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlojamientosService } from 'src/app/administracion/services/alojamientos.service';
import { PaquetesService } from 'src/app/administracion/services/paquetes.service';
import { ActividadesService } from 'src/app/administracion/services/actividades.service';
import { MunicipioService } from 'src/app/administracion/services/municipio.service';
import { SolicitudpaqueteService } from '../../services/solicitudpaquete.service';
import { TransportesService } from '../../services/transportes.service';
import { TourService } from 'src/app/services/tour.service';
import { EmpleadosService } from '../../services/empleados.service';
import { SegurosService } from '../../services/seguros.service';
import { PaqueteService } from 'src/app/services/paquete.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
})
export class SolicitudComponent implements OnInit {

  idSolicitud:any;
  
  public alojamientos: any = [];
  public municipios: any = [];
  public actividades: any=[];
  public form!: FormGroup;
  titulo = 'Agregar Paquete';
  boton = 'Agregar Paquete';
  id:any;
  // Tour
  public formTour!: FormGroup;
  public idTrans: any;
  public paquetes:any = [];
  public seguros:any = [];
  public empleados:any = [];
  public transportes:any = [];

  constructor(
    private alojamientoservice: AlojamientosService,
    private municipioService: MunicipioService,
    private actividadService: ActividadesService,
    private paqueteService: PaqueteService,
    private formBuilder: FormBuilder,
    private router : Router,
    private aRouter: ActivatedRoute,
    private solicitudService: SolicitudpaqueteService,
    private seguroService:SegurosService,
    private empleadoService:EmpleadosService,
    private tourService:TourService,
    private transporteService:TransportesService,
  ) { }

  ngOnInit(): void {
    this.idSolicitud = this.aRouter.snapshot.paramMap.get('idSolicitud');
    this.cargarSolicitud();
    this.id = this.aRouter.snapshot.paramMap.get('idPaq');
    this.esEditartour();
    this.agregarPaquetes();
    this.agregarSeguros();
    this.agregarEmpleados();
    this.agregarTransporte();
    this.esEditar();
    this.agregarAlojamiento();
    this.agregarMunicipio();

}

  public cargarSolicitud(){
    this.solicitudService.obtenerSolicitud(this.idSolicitud).subscribe(solicitud=>{

      let paquete = solicitud.tour.paquete;
      let tour = solicitud.tour;
      
    //   this.form=this.formBuilder.group({
    //   idPaq:["", Validators.required],
    //   precio:["", Validators.required],
    //   estado:["", Validators.required],
    //   urlImagen:['', Validators.required],
    //   descripcion:['', Validators.required],
    //   recomendacion:['', Validators.required],
    //   nombre:['', Validators.required],
    //   alojamiento:['', Validators.required],
    //   municipio:["", Validators.required],
    //   acts: this.formBuilder.array([])
    // });

    this.formTour=this.formBuilder.group({ 
      idTour: ['', Validators.required],
      minCupos: ['', Validators.required],
      maxCupos: ['', Validators.required],
      fechaLlegada: ['', Validators.required],
      fechaSalida: ['', Validators.required],
      estado: ['', Validators.required],
      empleado: ['', Validators.required],
      paquete: ['', Validators.required],
      idTransporte: ['', Validators.required],
      seguro: ['', Validators.required],
    });

    })
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
      console.log(this.formTour.value);
  //   if(this.id !== null){
  //    this.paqueteService.editarPaquete(this.form.value).subscribe((data) => {
  //     this.router.navigate(["/administracion/paquetes"]);
  //    });
        
  //  }else {
  //   console.log('actssss', this.getActividades.value);
  //   this.paqueteService.post(this.form.value).subscribe(paquete=>{
  //     console.log(paquete);
  //     this.paqueteService.postAct(this.getActividades.value, paquete.idPaq).subscribe(data=>{
  //       this.router.navigate(["/administracion/paquetes"]);})
  //     })
  //  }
   }
   public agregarPaquetes(){
    this.paqueteService.listar().subscribe(paquetes=>{
      this.paquetes = paquetes; 
    })
  }

  public agregarTransporte(){
    this.transporteService.listarTransporte().subscribe(transportes=>{
     this.transportes = transportes; 
    })
  }

 
  public agregarSeguros(){
    this.seguroService.listarSeguro().subscribe(seguros=>{
     this.seguros = seguros; 
    })
  }
  
  public agregarEmpleados(){
    this.empleadoService.listarEmpleado().subscribe(empleados=>{
     this.empleados = empleados;
    })
  }

   esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Paquete';
      this.boton = 'Editar Paquete';
      this.paqueteService.encontrar(this.id).subscribe((data) => {
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

  public esEditartour() {
    if (this.id !== null) {
      this.titulo = 'Editar Tour';
      this.boton = 'Editar Tour';
      
      this.tourService.encontrarTour(this.id).subscribe((data) => {
        this.form.setValue({
          idTour: data.idTour,
          minCupos: data.minCupos,
          maxCupos: data.maxCupos,
          fechaLlegada: data.fechaLlegada,
          fechaSalida:data.fechaSalida,
          empleado: data.empleado.idEmpleado,
          paquete: data.paquete.idPaq,
          idTransporte: null,
          seguro:data.seguro.idSeguro
        });
      });
      
      }
    }
}
