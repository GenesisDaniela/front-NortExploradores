import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TransportesService } from 'src/app/administracion/services/transportes.service';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-add-transportes',
  templateUrl: './add-transportes.component.html',
  styleUrls: ['./add-transportes.component.css']
})
export class AddTransportesComponent implements OnInit {

  public empresas:any = [];
  public form!: FormGroup;
  titulo = 'Agregar Transporte';
  boton = 'Agregar Transporte';
  id: string | null;
  constructor(
    
    private empresaService:EmpresaService,
    private transporteService:TransportesService,
    private formBuilder: FormBuilder,
    private aRouter: ActivatedRoute ,
    private router : Router,
    private toastr: ToastrService,
  ){
    this.id = aRouter.snapshot.paramMap.get('idTransporte');
  }

  ngOnInit(): void {
    this.esEditarTransporte();
    this.agregarEmpresa();
    
    this.form=this.formBuilder.group({

     idTransporte:['', Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(8)
    ])],

     puestos:  ['', Validators.compose([
      Validators.required,
      Validators.min(1),
      Validators.max(99)
    ])],

     modelo:  ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25)
        ])],

     color:  ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25)
        ])],

     precio: ['',
        Validators.compose([
          Validators.required,
          Validators.min(1000),
          Validators.maxLength(999999)
        ])],

     estado: ['',
        Validators.compose([
          Validators.required
        ])],

     empresa: ['',
     Validators.compose([
       Validators.required
     ])],
      
    });
  }
  public agregarEmpresa(){
    this.empresaService.listarEmpresa().subscribe(empresas=>{
      this.empresas = empresas; 
    })
  }
 
  public enviarData(){
    if (!this.form.valid) {
      this.toastr.error('¡Datos incorrectos!', 'ERROR', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      return;
    }

    else if (this.id !== null) {
      this.transporteService
        .editarTransporte(this.id, this.form.value)
        .subscribe((data) => { 
          this.toastr.success("Transporte Editado Con Exito!", "Transporte Editado", {
            positionClass: 'toast-bottom-right'
          })
          this.router.navigate(["/administracion/transportes"]);
        });
        
      } else {
        this.transporteService.post(this.form.value).subscribe((data) => {
          this.toastr.success("Transporte Agregado Con Exito!", "Transporte Registrado", {
            positionClass: 'toast-bottom-right'
          })
          this.router.navigate(["/administracion/transportes"]);
      });
    }
  }



  esEditarTransporte() {
    if (this.id !== null) {
      this.titulo = 'Editar transporte';
      this.boton = 'Editar transporte';
      this.transporteService.obtenerTransporte(this.id).subscribe((data) => {
        this.form.setValue({
          idTransporte: data.idTransporte,
          puestos: data.puestos,
          modelo: data.modelo,
          color: data.color,
          precio: data.precio,
          estado: data.estado,
          empresa: data.empresa.idEmpresa,
        });
        const output = document.getElementById('idTrans');
        if (output){
          output.setAttribute("value",data.idTransporte)
        }
      });
    }
  }

}
