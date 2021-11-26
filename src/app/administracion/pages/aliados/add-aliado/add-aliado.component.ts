import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-add-aliado',
  templateUrl: './add-aliado.component.html',
  styleUrls: ['./add-aliado.component.css']
})
export class AddAliadoComponent implements OnInit {

  public form !: FormGroup;
  titulo = 'Agregar Aliado';
  boton = 'Agregar Aliado';
  id: string | null;
  // router: any; TODO: puedo borrar este? lo estan usando?

  constructor(
    private empresaService: EmpresaService,
    private formBuilder: FormBuilder,
    private aRouter: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.id = aRouter.snapshot.paramMap.get('idAliado');
  }

  ngOnInit(): void {
    this.esEditar();
    this.form = this.formBuilder.group({
      idEmpresa: ['', Validators.compose([
        Validators.required,
        Validators.min(100000000),
        Validators.max(9999999999)
      ])],
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])],
      direccion: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50)
        ])],
      mision: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(500)
        ])],
      vision: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(500)
        ])],
      correo: ['',
        Validators.compose([
          Validators.required,
          Validators.email,
        ])],
      telefono: ['',
        Validators.compose([
          Validators.required,
          Validators.min(1000000),
          Validators.max(9999999999),
        ])],
      descripcion: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(500)
        ])],
      urlImagen: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(500)
        ])],
      fecha: ['', Validators.required],
      estado: ['',
        Validators.compose([
          Validators.required
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
    else if (this.id !== null) {
      this.empresaService.editarEmpresa(this.id, this.form.value).subscribe((data) => {
        this.toastr.success("Aliado Editado Con Exito!", "Aliado Editado", {
          positionClass: 'toast-bottom-right'
        })
        this.router.navigate(["/administracion/aliados"]);
      });
    } else {
      this.empresaService.post(this.form.value)
        .subscribe(data => {
          this.toastr.success("Aliado Agregado Con Exito!", "Aliado Registrado", {
            positionClass: 'toast-bottom-right'
          })
        });
      this.router.navigateByUrl("/administracion/aliados");
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Aliado';
      this.boton = 'Editar Aliado';
      this.empresaService.obtenerEmpresa(this.id).subscribe((data) => {
        this.form.setValue({
          nombre: data.nombre,
          direccion: data.direccion,
          mision: data.mision,
          vision: data.vision,
          correo: data.correo,
          telefono: data.telefono,
          descripcion: data.descripcion,
          urlImagen: data.urlImagen,
          idEmpresa: data.idEmpresa,
          fecha: data.fecha,
          estado: data.estado,
        });
        const output = document.getElementById('idEmp');
          if (output){
            output.setAttribute("value",data.idEmpresa)
          }
      });
    }
  }
}
