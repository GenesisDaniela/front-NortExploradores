import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from 'src/app/administracion/services/empleados.service';
import { MunicipioService } from 'src/app/administracion/services/municipio.service';
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
  public transportes:any = [];
  public municipios:any = [];
  public form !: FormGroup;
  public formRut !: FormGroup;
  public formTrans !: FormGroup;
  
 
  constructor(
    private paqueteService:PaqueteService,
    private seguroService:SegurosService,
    private MunicipioService:MunicipioService,
    private empleadoService:EmpleadosService,
    private tourService:ToursService,
    private rutaService:RutasService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.agregarPaquetes();
    this.agregarSeguros();
    this.agregarRutas();
    this.agregarEmpleados();
    this.agregarMunicipio();
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
    this.formRut=this.formBuilder.group({ 
      municipio: ['', Validators.required],
    });
    this.formTrans=this.formBuilder.group({ 
      idTransporte: ['', Validators.required],
    });
  }

  public agregarPaquetes(){
    this.paqueteService.listar().subscribe(paquetes=>{
      this.paquetes = paquetes; 
    })
  }

  public agregarMunicipio(){
    this.MunicipioService.listarMunicipio().subscribe(municipios=>{
      this.municipios = municipios; 
    })
  }

  public agregarSeguros(){
    this.seguroService.listarSeguro().subscribe(seguros=>{
     this.seguros = seguros; 
    })
  }

  public agregarRutas(){
    this.rutaService.listarRuta().subscribe((rutas: any)=>{
     this.rutas = rutas; 
    })
  }
  
  public agregarEmpleados(){
    this.empleadoService.listarEmpleado().subscribe(empleados=>{
     this.empleados = empleados;
    })
  }

  public enviarData(){

    this.form.controls.ruta.setValue(this.formRut.value);
    console.log(this.form.value);
    console.log(this.formRut.value);
    this.rutaService.post(this.formRut.value).subscribe(ruta=>{
      this.rutaService.guardarTransporteRuta(ruta.idRuta,  this.formTrans.controls.idTransporte)
      this.tourService.post(this.form.value).subscribe(data=>{})
    })
  }
}