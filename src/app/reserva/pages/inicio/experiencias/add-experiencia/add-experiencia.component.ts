import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CalificacionService } from '../../../../../services/calificacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-experiencia',
  templateUrl: './add-experiencia.component.html',
  styleUrls: ['./add-experiencia.component.css']
})
export class AddExperienciaComponent implements OnInit {

  public form !: FormGroup;
  public experiencias: any = [];
  titulo = 'Agregar Experiencia';
  boton = 'Agregar Experiencia';
  id: string | null;
  
  constructor(
    private experienciaservice: CalificacionService,
    private formBuilder: FormBuilder,
    private aRouter: ActivatedRoute,
    private router : Router,
    private toastr: ToastrService,

  ) {
    this.id = aRouter.snapshot.paramMap.get('idCalificacion');
  }

  ngOnInit(): void {
    this.inExperiencia();
      this.form = this.formBuilder.group({
      idCalificacion:['', Validators.required],
      puntuacion:['', Validators.required],
      comentario:['', Validators.required],
      tour:['', Validators.required],
      usuario:['', Validators.required]
    });
  }

  public enviarData() {
    if (this.id !== null) {

      this.experienciaservice.editarCalificacion(this.id, this.form.value)
        .subscribe((data) => {
          this.router.navigate(["/clientes/experiencias"]);
        });
    } else {
      this.experienciaservice.post(this.form.value).subscribe((data)=>{
        this.toastr.success("Experiencia Agregada Con Exito!", "Experiencia Añadida", {
          positionClass: 'toast-bottom-right'
        })
        this.router.navigate(["/clientes/experiencias"]);
      });
    }
  }

  inExperiencia() {
    if (this.id !== null) {
      this.titulo = 'Agregar Experiencia';
      this.boton = 'Agregar Experiencia';
      this.experienciaservice.obtenerCalificacion(this.id).subscribe((data) => {
        this.form.setValue({
          idCalificacion: data.idCalificacion,
          puntuacion: data.puntuacion,
          comentario: data.comentario,
          tour: data.tour.idTour,
          usuario: data.usuario.id_Usuario,
        });
      });
    }
  }

}
