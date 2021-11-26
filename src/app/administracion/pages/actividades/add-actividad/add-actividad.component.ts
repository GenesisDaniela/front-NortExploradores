import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActividadesService } from 'src/app/administracion/services/actividades.service';
import { PaquetesService } from 'src/app/administracion/services/paquetes.service';

@Component({
  selector: 'app-add-actividad',
  templateUrl: './add-actividad.component.html',
  styleUrls: ['./add-actividad.component.css']
})
export class AddActividadComponent implements OnInit {

  public form !     : FormGroup;
  public actividades: any = [];
  public paquetes   : any = [];
  titulo = 'Agregar Actividad';
  boton = 'Agregar Actividad';
  id: string | null;

  constructor(
    private actividadService: ActividadesService,
    private paqueteService: PaquetesService,
    private formBuilder: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    
  ) {
    this.id = aRouter.snapshot.paramMap.get('idActividad');

  }

  ngOnInit(): void {
    this.esEditarAct();
    this.agregarPaquete();
    this.form = this.formBuilder.group({
      idActividad: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      urlImg: ['', Validators.required],
      estado: ['', Validators.required],
      paquete: ['', Validators.required]
    });
  }


  public agregarPaquete() {
    this.paqueteService.listarPaquete().subscribe(paquetes => {
      this.paquetes = paquetes;
    })
  }

  public enviarData() {

    //edita alojamiento
    if (this.id !== null) {
      this.actividadService
        .editarActividad(this.id, this.form.value)
        .subscribe((data) => { 
          this.toastr.success("Actividad editada Con Exito!", "Actividad Editada", {
            positionClass: 'toast-bottom-right'
          })
          this.router.navigate(["/administracion/actividades"]); 
        });

      //agrega alojamiento
    } else {
      this.actividadService.post(this.form.value).subscribe((data) => { 
        this.toastr.success("Actividad Agregada Con Exito!", "Actividad Registrada", {
          positionClass: 'toast-bottom-right'
        })
        this.router.navigate(["/administracion/actividades"]); });
    }
  }

  esEditarAct() {
    if (this.id !== null) {
      this.titulo = 'Editar actividad';
      this.boton = 'Editar actividad';
      this.actividadService.obtenerActividad(this.id).subscribe((data) => {
        this.form.setValue({
          idActividad: data.idActividad,
          nombre: data.nombre,
          descripcion: data.descripcion,
          urlImg: data.urlImg,
          estado: data.estado,
          paquete: data.paquete.idPaq
        });
      });
    }
  }



}
