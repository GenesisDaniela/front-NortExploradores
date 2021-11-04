import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from 'src/app/administracion/services/empleados.service';
import { RutasService } from 'src/app/administracion/services/rutas.service';
import { SegurosService } from 'src/app/administracion/services/seguros.service';
import { ToursService } from 'src/app/administracion/services/tours.service';
import { PaqueteService } from 'src/app/services/paquete.service';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.css']
})
export class AddTourComponent implements OnInit {

  public paquetes:any = [];
  public seguros:any = [];
  public rutas:any = [];
  public empleados:any = [];
  public form !: FormGroup;
  
 
  constructor(
    private paqueteService:PaqueteService,
    private seguroService:SegurosService,
    private empleadoService:EmpleadosService,
    private tourService:ToursService ,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.agregarPaquetes();
    this.agregarSeguros();
    this.agregarEmpleados();
    this.form=this.formBuilder.group({ 
      minCupos: ['', Validators.required],
      maxCupos: ['', Validators.required],
      fechaLlegada: ['', Validators.required],
      fechaSalida: ['', Validators.required],
      precio: ['', Validators.required],
      cantCupos: ['', Validators.required],
      empleado: ['', Validators.required],
      paquete: ['', Validators.required],
      ruta: ['', Validators.required],
      seguro: ['', Validators.required],
    });
  }

  public agregarPaquetes(){
    this.paqueteService.listar().subscribe(paquetes=>{
      this.paquetes = paquetes; 
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
    this.tourService.post(this.form.value).subscribe()
      
  }
}
