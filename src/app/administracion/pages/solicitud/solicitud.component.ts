import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlojamientosService } from 'src/app/administracion/services/alojamientos.service';
import { EmpleadosService } from 'src/app/administracion/services/empleados.service';
import { MunicipioService } from 'src/app/administracion/services/municipio.service';
//import { MunicipioService } from 'src/app/administracion/services/municipio.service';
//import { RutasService } from 'src/app/administracion/services/rutas.service';
import { SegurosService } from 'src/app/administracion/services/seguros.service';
import { ToursService } from 'src/app/administracion/services/tours.service';
import { TransportesService } from 'src/app/administracion/services/transportes.service';
import { PaqueteService } from 'src/app/services/paquete.service';
import { SolicitudpaqueteService } from '../../services/solicitudpaquete.service';

@Component({
  selector: 'app-add-tour',
  templateUrl: './solicitud.component.html',
})
export class SolicitudComponent implements OnInit {
  
  titulo = 'Agregar Tour';
  boton = 'Agregar Tour';
  public idSolicitud:any;
  id:any;
  public seguros:any = [];
  public empleados:any = [];
  public transportes:any = [];
  public form !: FormGroup;
  public alojamientos: any = [];
  public municipios: any = [];
  public actividades: any=[];
  //public formTrans !: FormGroup;
  
 
  constructor(
    private paqueteService:PaqueteService,
    private seguroService:SegurosService,
    private empleadoService:EmpleadosService,
    private tourService:ToursService,
    private transporteService:TransportesService,
    private formBuilder:FormBuilder,
    private aRouter: ActivatedRoute,
    private router:Router,
    private solicitudService: SolicitudpaqueteService,
    private alojamientoservice: AlojamientosService,
    private municipioService: MunicipioService

  ) {  
    
   }

  ngOnInit(): void {
    this.idSolicitud = this.aRouter.snapshot.paramMap.get('idSolicitud');
    this.esEditartour();
    this.agregarSeguros();
    this.agregarEmpleados();
    this.agregarTransporte();  
    this.form=this.formBuilder.group({ 
      idTour: ['', Validators.required],
      minCupos: ['', Validators.required],
      maxCupos: ['', Validators.required],
      fechaLlegada: ['', Validators.required],
      fechaSalida: ['', Validators.required],
      empleado: ['', Validators.required],
      idTransporte: ['', Validators.required],
      seguro: ['', Validators.required],

      idPaq:['', Validators.required],
      precio:['', Validators.required],
      estado:['', Validators.required],
      urlImagen:['', Validators.required],
      descripcion:['', Validators.required],
      recomendacion:['', Validators.required],
      nombre:['', Validators.required],
      alojamiento:['', Validators.required],
      municipio:['', Validators.required],
    });

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

  public enviarData(){
    if (this.id !== null) {
      this.tourService.editarTour(this.form.value).subscribe((data) => {
        this.tourService.guardarTransporteTour(data.idTour,  this.form.controls.idTransporte.value).subscribe((data) => {
          this.router.navigate(["/administracion/tours"]);
        });
      });

    } else {
    this.tourService.post(this.form.value).subscribe((data) => {
      this.tourService.guardarTransporteTour(data.idTour,  this.form.controls.idTransporte.value).subscribe((data) => {
        this.router.navigate(["/administracion/tours"]);
      });
    });
  }
}


public esEditartour() {
    this.titulo = 'Llenar solicitud';
    this.boton = 'Enviar solicitud';
    
    this.solicitudService.obtenerSolicitud(this.idSolicitud).subscribe(solicitud=>{
      let tour = solicitud.tour;
      let paquete = solicitud.tour.paquete;
      console.log(tour);
      this.form.setValue({
          idTour: tour.idTour,
          minCupos: tour.minCupos,
          maxCupos: tour.maxCupos,
          fechaLlegada: tour.fechaLlegada,
          fechaSalida:tour.fechaSalida,
          empleado: tour.empleado.idEmpleado,
          paquete: tour.paquete.idPaq,
          idTransporte: null,
          seguro:tour.seguro.idSeguro
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
}