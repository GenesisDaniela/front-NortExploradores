import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { CargosService } from 'src/app/administracion/services/cargos.service';
import { CargoComponent } from '../cargo.component';

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
    private aRouter: ActivatedRoute,
    private router : Router,
    private toastr: ToastrService
  ) {
    this.id = aRouter.snapshot.paramMap.get('idCargo');
  }

  ngOnInit(): void {
    this.esEditar();
   // this.deshabilitar();
    this.form = this.formBuilder.group({
      idCargo: ['', ],
      estado: ['', Validators.required],
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25)
      ])],
      descripcion: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(200)
        ])],
      sueldo: ['', Validators.compose([
        Validators.required,
        Validators.min(10000),
        Validators.max(9999999),
      ])],
    });
  }

  public enviarData() {
    if (!this.form.valid) {
      this.toastr.error('¡Datos incorrectos!', 'ERROR', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      return;
    }
    if (this.id !== null) {
      this.cargoService.editarCargo(this.id, this.form.value).subscribe((data) => {
        this.toastr.success('Cargo Editado Con Exito!', 'Cargo Editado',{
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(["/administracion/cargos"]);
      });
    } else {
      this.cargoService.post(this.form.value).subscribe((data) => {
        this.toastr.success('Cargo Agregado Con Exito!', 'Cargo Registrado',{
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(["/administracion/cargos"]);
      });

    
    }

    // CargoComponent.prototype.handleOk();
  }

  esEditar() {
    // this.aRouter.snapshot.paramMap("idCargo");
    if (this.id !== null) {
      this.titulo = 'Editar Cargo';
      this.boton = 'Editar Cargo';
      this.cargoService.obtenerCargo(this.id).subscribe((data) => {
        this.form.setValue({
          idCargo: data.idCargo,
          nombre: data.nombre,
          estado: data.estado,
          descripcion: data.descripcion,
          sueldo: data.sueldo,
          cargo: data.cargo,
        });
      });
    }
  }
  // deshabilitar(){
  //   this.cargoService.desabilitar(this.form.controls.idCargo.value).subscribe((data) => {
      
  //   });
  // }
  
}
