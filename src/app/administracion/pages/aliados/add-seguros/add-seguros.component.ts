import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SegurosService } from 'src/app/administracion/services/seguros.service';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-add-seguros',
  templateUrl: './add-seguros.component.html',
  styleUrls: ['./add-seguros.component.css']
})
export class AddSegurosComponent implements OnInit {

  public empresas:any = [];
  public form!: FormGroup;
  titulo = 'Agregar Seguro';
  boton = 'Agregar Seguro';
  id: string | null;

  constructor(
    private empresaService:EmpresaService,
    private seguroService:SegurosService,
    private formBuilder: FormBuilder,
    private aRouter: ActivatedRoute ,
    private router : Router,
    private toastr: ToastrService,
  ){
    this.id = aRouter.snapshot.paramMap.get('idSeguro');
  }

  ngOnInit(): void {
    this.agregarEmpresa();
    this.esEditar();
    this.form=this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      idSeguro: ['', Validators.required],
      empresa: ['', Validators.required]
      
    });
  }
  public agregarEmpresa(){
    this.empresaService.listarEmpresa().subscribe(empresas=>{
      this.empresas = empresas; 
    })
  }
 
  public enviarData(){
    if (this.id !== null) {
      this.seguroService
        .editarSeguro(this.id, this.form.value)
        .subscribe((data) => {this.router.navigate(["/administracion/seguros"]);});
    } else {
      this.seguroService.post(this.form.value).subscribe((data) => {
        this.toastr.success('Seguro Agregado Con Exito!', 'Seguro Registrado', {
          positionClass: 'toast-bottom-right' 
        })
        this.router.navigate(["/administracion/seguros"]);
      });
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Seguro';
      this.boton = 'Editar Seguro';
      this.seguroService.obtenerSeguro(this.id).subscribe((data) => {
        this.form.setValue({
          nombre: data.nombre,
          descripcion: data.descripcion,
          precio: data.precio,
          idSeguro: data.idSeguro,
          empresa: data.empresa.idEmpresa,
        });
      });
    }
  }

}
