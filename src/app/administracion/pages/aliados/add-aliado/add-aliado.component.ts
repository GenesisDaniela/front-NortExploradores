import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  router: any;

  constructor(
    private empresaService: EmpresaService,
    private formBuilder:FormBuilder,
    private aRouter: ActivatedRoute
  ) {
    this.id = aRouter.snapshot.paramMap.get('idAliado');
  }

  ngOnInit(): void {
    this.esEditar();
    this.form=this.formBuilder.group({ 
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      mision: ['', Validators.required],
      vision: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      descripcion: ['', Validators.required],
      urlImagen: ['', Validators.required],
      idEmpresa: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  public enviarData(){
    if (this.id !== null) {
      this.empresaService
        .editarEmpresa(this.id, this.form.value)
        .subscribe((data) => {});
    } else {
      this.empresaService.post(this.form.value)
      .subscribe();
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
        });
      });
    }
  }



}
