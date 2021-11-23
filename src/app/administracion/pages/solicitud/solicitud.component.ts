import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlojamientosService } from 'src/app/administracion/services/alojamientos.service';
import { PaquetesService } from 'src/app/administracion/services/paquetes.service';
import { ActividadesService } from 'src/app/administracion/services/actividades.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MunicipioService } from 'src/app/administracion/services/municipio.service';
import { SegurosService } from '../../services/seguros.service';
import { EmpleadosService } from '../../services/empleados.service';
import { TourService } from 'src/app/services/tour.service';
import { TransportesService } from '../../services/transportes.service';
import { ToastrService } from 'ngx-toastr';
import { SolicitudpaqueteService } from '../../services/solicitudpaquete.service';

@Component({
  selector: 'app-add-tour',
  templateUrl: './solicitud.component.html',
})
export class SolicitudComponent implements OnInit {
  public paquetes: any = [];
  public seguros: any = [];
  public empleados: any = [];
  public transportes: any = [];
  public alojamientos: any = [];
  public municipios: any = [];
  public actividades: any = [];
  public form!: FormGroup;
  titulo = 'Agregar Paquete';
  boton = 'Agregar Paquete';
  public isAceptado = false;
  public isRechazado=false;
  public flag:any;
  id: string | null;

  constructor(
    private alojamientoservice: AlojamientosService,
    private municipioService: MunicipioService,
    private actividadService: ActividadesService,
    private paqueteService: PaquetesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute,
    private seguroService: SegurosService,
    private empleadoService: EmpleadosService,
    private tourService: TourService,
    private transporteService: TransportesService,
    private toastr: ToastrService,
    private solicitudPaqueteService: SolicitudpaqueteService
  ) {
    this.id = aRouter.snapshot.paramMap.get('idSolicitud');
  }

  ngOnInit(): void {
    this.agregarPaquetes();
    this.agregarSeguros();
    this.agregarEmpleados();
    this.agregarTransporte();
    this.agregarAlojamiento();
    this.agregarMunicipio();

    this.form = this.formBuilder.group({
      idPaq: ['', Validators.required],
      precio: ['', Validators.required],
      estado: ['', Validators.required],
      urlImagen: ['', Validators.required],
      descripcion: ['', Validators.required],
      recomendacion: ['', Validators.required],
      nombre: ['', Validators.required],
      alojamiento: ['', Validators.required],
      municipio: ['', Validators.required],
      acts: this.formBuilder.array([]),
      descripcionUsuario:['', Validators.required],
      tour: this.formBuilder.group({
        idTour: ['', Validators.required],
        minCupos: ['', Validators.required],
        maxCupos: ['', Validators.required],
        fechaLlegada: ['', Validators.required],
        fechaSalida: ['', Validators.required],
        empleado: ['', Validators.required],
        paquete: ['', Validators.required],
        idTransporte: ['', Validators.required],
        seguro: ['', Validators.required],
      })
    });
    this.solicitudPaqueteService.obtenerSolicitud(this.id).subscribe(solicitud => {
      console.log(solicitud);
      const out = document.getElementById("cliente");
      if (out) out.innerHTML = solicitud.usuario.username
      console.log(solicitud.tour.paquete.idPaq);
      if(solicitud.tour.paquete.estado =="ACEPTADO"){
        this.isAceptado=true;
        return;
      }
      else if(solicitud.tour.paquete.estado =="RECHAZADO"){
        this.isRechazado=true;
        return;
      }
      this.flag=2;
      this.form.setValue({
        idPaq: solicitud.tour.paquete.idPaq,
        precio: solicitud.tour.paquete.precio,
        estado: "ACEPTADO",
        urlImagen: "",
        descripcion: "",
      alojamiento:"",
        recomendacion: "",
        nombre: "",
        acts:[],
        descripcionUsuario:solicitud.descripcion,
        municipio: solicitud.tour.paquete.municipio.idMuni,
        tour: {
          idTour: solicitud.tour.idTour,
          minCupos: solicitud.tour.minCupos,
          maxCupos: solicitud.tour.maxCupos,
          fechaLlegada: solicitud.tour.fechaLlegada,
          fechaSalida: solicitud.tour.fechaSalida,
          empleado: solicitud.tour.empleado,
          paquete: solicitud.tour.paquete.idPaq,
          idTransporte: "",
          seguro: "",
        }
      })
    })
    console.log(this.form.value);

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

  public cargarActividades(evento: any) {

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

  get getActividades() {
    return this.form.get('acts') as FormArray;
  }
  get getTour() {
    console.log(this.form.get('tour') as FormGroup);
    return this.form.get('tour') as FormGroup;
  }

  public enviarData() {

    this.paqueteService.post(this.form.value).subscribe(paquete => {
      if (this.getActividades.value.length > 0) {
        this.paqueteService.postAct(this.getActividades.value, paquete.idPaq).subscribe(data => {
          this.tourService.post(this.form.value.tour).subscribe(tour => {
            this.router.navigate(["/administracion/paquetes"]);
          })
        })
      } else {
        this.tourService.post(this.form.value.tour).subscribe(tour => {
          this.toastr.success("La solicitud ha sido aceptada", 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.router.navigate(["/administracion/paquetes"]);
        })

      }

    })

  }

  public agregarPaquetes() {
    this.paqueteService.listar().subscribe((paquetes) => {
      this.paquetes = paquetes;
    });
  }

  public agregarTransporte() {
    this.transporteService.listarTransporte().subscribe((transportes) => {
      this.transportes = transportes;
    });
  }

  public agregarSeguros() {
    this.seguroService.listarSeguro().subscribe((seguros) => {
      this.seguros = seguros;
    });
  }

  public agregarEmpleados() {
    this.empleadoService.listarEmpleado().subscribe((empleados) => {
      this.empleados = empleados;
    });
  }



}
