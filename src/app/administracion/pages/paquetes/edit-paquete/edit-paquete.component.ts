import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlojamientosService } from 'src/app/administracion/services/alojamientos.service';
import { PaquetesService } from 'src/app/administracion/services/paquetes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MunicipioService } from 'src/app/administracion/services/municipio.service';

@Component({
  selector: 'app-edit-paquete',
  templateUrl: './edit-paquete.component.html',
  styleUrls: ['./edit-paquete.component.css']
})
export class EditPaqueteComponent implements OnInit {

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
    private paqueteService: PaquetesService,
    private formBuilder: FormBuilder,
    private router : Router,
    private aRouter: ActivatedRoute

  ) { this.id = aRouter.snapshot.paramMap.get('idPaq');}

  ngOnInit(): void {
    this.esEditar();
    this.agregarAlojamiento();
    this.agregarMunicipio();
    this.form=this.formBuilder.group({
      idPaq:['', Validators.required],
      precio:['', Validators.required],
      // estado:['', Validators.required],
      urlImagen:['', Validators.required],
      descripcion:['', Validators.required],
      recomendacion:['', Validators.required],
      nombre:['', Validators.required],
      alojamiento:['', Validators.required],
      municipio:['', Validators.required],
    
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


  // if (this.id !== null) {
  //   this.cargoService.editarCargo(this.id, this.form.value).subscribe((data) => {
  //     this.router.navigate(["/administracion/cargos"]);
  //   });
  public enviarData() {
    if (this.id !== null) {
    this.paqueteService.editarPaquete(this.id, this.form.value).subscribe((data)=>{
      this.router.navigate(["/administracion/paquete"]);
    // this.paqueteService.post(this.form.value).subscribe(paquete=>{
    //   console.log(paquete);
     
      })
    }
   }

   esEditar() {
    if (this.id !== null) {
      this.paqueteService.obtenerPaquete(this.id).subscribe((data) => {
        this.form.setValue({
          idPaq:data.idPaq,
          precio: data.precio,
          // estado: data.estado,
          urlImagen: data.urlImagen,
          descripcion: data.descripcion,
          recomendacion: data.recomendacion,
          nombre: data.nombre,
          alojamiento: data.alojamiento.idAlojamiento,
          municipio:data.municipio.idMuni
        });
      });
    }
  }



}
