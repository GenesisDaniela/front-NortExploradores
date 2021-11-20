import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from 'src/app/administracion/services/empleados.service';
//import { MunicipioService } from 'src/app/administracion/services/municipio.service';
//import { RutasService } from 'src/app/administracion/services/rutas.service';
import { SegurosService } from 'src/app/administracion/services/seguros.service';
import { ToursService } from 'src/app/administracion/services/tours.service';
import { TransportesService } from 'src/app/administracion/services/transportes.service';
import { PaqueteService } from 'src/app/services/paquete.service';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.css'],
})
export class AddTourComponent implements OnInit {
  titulo = 'Agregar Tour';
  boton = 'Agregar Tour';
  id: string | null;
  idTrans: string | null;
  public paquetes: any = [];
  public seguros: any = [];
  public empleados: any = [];
  public transportes: any = [];
  public form!: FormGroup;
  //public formTrans !: FormGroup;

  constructor(
    private paqueteService: PaqueteService,
    private seguroService: SegurosService,
    private empleadoService: EmpleadosService,
    private tourService: ToursService,
    private transporteService: TransportesService,
    private formBuilder: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router
  ) {
    this.id = aRouter.snapshot.paramMap.get('idTour');
    this.idTrans = aRouter.snapshot.paramMap.get('idTour/idTransporte');
  }

  ngOnInit(): void {
    this.esEditartour();
    this.agregarPaquetes();
    this.agregarSeguros();
    this.agregarEmpleados();
    this.agregarTransporte();
    this.form = this.formBuilder.group({
      idTour: ['', Validators.required],
      minCupos: ['', Validators.required],
      maxCupos: ['', Validators.required],
      fechaLlegada: ['', Validators.required],
      fechaSalida: ['', Validators.required],
      // estado: ['', Validators.required],
      empleado: ['', Validators.required],
      paquete: ['', Validators.required],
      idTransporte: ['', Validators.required],
      seguro: ['', Validators.required],
    });
    // this.formTrans=this.formBuilder.group({
    //   transporte: ['', Validators.required],
    // });
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

  public enviarData() {
    if (this.id !== null) {
      this.tourService.editarTour(this.form.value).subscribe((data) => {
        this.tourService
          .guardarTransporteTour(
            data.idTour,
            this.form.controls.idTransporte.value
          )
          .subscribe((data) => {
            console.log(data);
            this.router.navigate(['/administracion/tours']);
          });
      });
    } else {
      this.tourService.post(this.form.value).subscribe((data) => {
        this.tourService
          .guardarTransporteTour(
            data.idTour,
            this.form.controls.idTransporte.value
          )
          .subscribe((data) => {
            this.router.navigate(['/administracion/tours']);
          });
      });
    }
  }

  public esEditartour() {
    if (this.id !== null) {
      this.titulo = 'Editar Tour';
      this.boton = 'Editar Tour';
let tour:any

      this.tourService.obtenerTour(this.id).subscribe((data) => {
        tour=data
        this.tourService.obtenerTrans(this.id).subscribe((data) => {
          console.log(data)
          this.form.setValue({
            idTour: tour.idTour,
            minCupos: tour.minCupos,
            maxCupos: tour.maxCupos,
            fechaLlegada: tour.fechaLlegada,
            fechaSalida: tour.fechaSalida,
            empleado: tour.empleado.idEmpleado,
            paquete: tour.paquete.idPaq,
            idTransporte: data.idTransporte,
            seguro: tour.seguro.idSeguro,
          });
        });
      });
    }
  }
}
