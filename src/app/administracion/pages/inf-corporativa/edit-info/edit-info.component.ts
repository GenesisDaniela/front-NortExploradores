import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '../../../../services/empresa.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {

  id  :any;
  form:FormGroup;
  data:any;
  estado :any;

  constructor(private aRoute: ActivatedRoute, private empresa: EmpresaService, private fb: FormBuilder, private router : Router) { 

    this.form = this.fb.group({
      idEmpresa  : ["", Validators.required],
      nombre      : ["", Validators.required],
      mision      : ["", Validators.required],
      vision      : ["", Validators.required],
      descripcion : ["", Validators.required],
      direccion   : ["", Validators.required],
      urlImagen   : ["", Validators.required],
      correo      : ["", Validators.required],
      estado      : ["", Validators.required],
      telefono    : ["", Validators.required],
      fecha       : ["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.id = this.aRoute.snapshot.paramMap.get("idEmp");
    

    this.empresa.obtenerEmpresa(this.id).subscribe(data=>{
      console.log(data)
      this.data =data;

      if(data.estado){
        this.estado="activo";
      }else{
        this.estado="inactivo"
      }

      this.form.setValue({
          idEmpresa   : data.idEmpresa,
          nombre      : data.nombre,
          mision      : data.mision,
          vision      : data.vision,
          descripcion : data.descripcion,
          direccion   : data.direccion,
          urlImagen   : data.urlImagen,
          correo      : data.correo,
          estado      : data.estado,
          telefono    : data.telefono,
          fecha       : data.fecha
      })
    })
    
  }

  enviarData(){
    this.empresa.editarEmpresa(this.id, this.form.value).subscribe(data=>{
       console.log(this.form.value);
       this.router.navigateByUrl("/administracion/infoCorporativa");
    })
    console.log(this.form.value)
  }

}
