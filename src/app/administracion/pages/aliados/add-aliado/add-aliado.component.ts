import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-add-aliado',
  templateUrl: './add-aliado.component.html',
  styleUrls: ['./add-aliado.component.css']
})
export class AddAliadoComponent implements OnInit {

  public form !: FormGroup;
  
  constructor(
    private empresaService: EmpresaService,
    private formBuilder:FormBuilder
  ) {}

  ngOnInit(): void {
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
    console.log(this.form.value)
    this.empresaService.post(this.form.value).subscribe()
      
  }

}
