import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { AlojamientosService } from 'src/app/administracion/services/alojamientos.service';



@Component({
  selector: 'app-add-alojamiento',
  templateUrl: './add-alojamiento.component.html',
  styleUrls: ['./add-alojamiento.component.css']
})
export class AddAlojamientoComponent implements OnInit {
  public form !: FormGroup;
  public alojamientos: any = [];
  titulo = 'Agregar Alojamiento';
  boton = 'Agregar Alojamiento';
  id: string | null;
  
  constructor(
    private alojamientosservice: AlojamientosService,
    private formBuilder: FormBuilder,
    private aRouter: ActivatedRoute,
    private router : Router
  ) {
    this.id = aRouter.snapshot.paramMap.get('idAlojamiento');
  }

  ngOnInit(): void {
    this.esEditarAloja();
      this.form = this.formBuilder.group({
      idAlojamiento:['', Validators.required],
      nombre:['', Validators.required],
      dir:['', Validators.required],
      descripcion:['', Validators.required],
      precio:['', Validators.required]
    });
  }

  public enviarData() {
      console.log('sss')
    if (this.id !== null) {

      this.alojamientosservice.editarAlojamiento(this.id, this.form.value)
        .subscribe((data) => {
          this.router.navigate(["/administracion/alojamientos"]);
        });
    } else {
      this.alojamientosservice.post(this.form.value).subscribe((data)=>{
        this.router.navigate(["/administracion/alojamientos"]);
      });
    }
  }

  esEditarAloja() {
    if (this.id !== null) {
      this.titulo = 'Editar Alojamiento';
      this.boton = 'Editar Alojamiento';
      this.alojamientosservice.obtenerAlojamiento(this.id).subscribe((data) => {
        this.form.setValue({
          idAlojamiento: data.idAlojamiento,
          nombre: data.nombre,
          dir: data.dir,
          descripcion: data.descripcion,
          precio: data.precio,
        });
      });
    }
  }
}
