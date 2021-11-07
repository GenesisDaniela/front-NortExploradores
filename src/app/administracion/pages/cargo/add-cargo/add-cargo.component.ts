import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { CargosService } from 'src/app/administracion/services/cargos.service';

@Component({
  selector: 'app-add-cargo',
  templateUrl: './add-cargo.component.html',
  styleUrls: ['./add-cargo.component.css'],
})
export class AddCargoComponent implements OnInit {
  public cargos: any = [];
  public form!: FormGroup;
  titulo = 'Agregar Cargo';
  boton = 'Agregar Cargo';
  id: string | null;
  constructor(
    private cargoService: CargosService,
    private formBuilder: FormBuilder,
    private aRouter: ActivatedRoute
  ) {
    this.id = aRouter.snapshot.paramMap.get('idCargo');
  }

  ngOnInit(): void {
    this.esEditar();
    this.form = this.formBuilder.group({
      idCargo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      sueldo: ['', Validators.required],
    });
  }

  public enviarData() {
    if (this.id !== null) {
      this.cargoService
        .editarCargo(this.id, this.form.value)
        .subscribe((data) => {});
    } else {
      this.cargoService.post(this.form.value).subscribe();
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Cargo';
      this.boton = 'Editar Cargo';
      this.cargoService.obtenerCargo(this.id).subscribe((data) => {
        this.form.setValue({
          idCargo: data.idCargo,
          nombre: data.nombre,
          descripcion: data.descripcion,
          sueldo: data.sueldo,
        });
      });
    }
  }
}
