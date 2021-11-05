import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    
    private empresaService:EmpresaService,
    private transporteService:TransportesService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.agregarEmpresa();
    this.form=this.formBuilder.group({
      puestos: ['', Validators.required],
      modelo: ['', Validators.required],
      color: ['', Validators.required],
      precio: ['', Validators.required],
      idTransporte: ['', Validators.required],
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
    this.transporteService.post(this.form.value).subscribe()
  }

}
