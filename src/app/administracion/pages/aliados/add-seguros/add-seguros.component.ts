import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    
    private empresaService:EmpresaService,
    private seguroService:SegurosService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.agregarEmpresa();
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
    console.log(this.form.value);
    this.seguroService.post(this.form.value).subscribe()
  }

}
