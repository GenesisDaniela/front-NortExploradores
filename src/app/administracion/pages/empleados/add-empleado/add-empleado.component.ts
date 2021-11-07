import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from 'src/app/administracion/services/empleados.service';
import { CargoService } from 'src/app/services/cargo.service';
import { PersonaService } from 'src/app/administracion/services/persona.service';
import { TipoidService } from 'src/app/services/tipoid.service';

@Component({
  selector: 'app-add-empleado',
  templateUrl: './add-empleado.component.html',
  styleUrls: ['./add-empleado.component.css']
})
export class AddEmpleadoComponent implements OnInit {
  
  public cargos:any = [];
  public personas:any = [];
  public empleados:any = [];
  public tipos:any = [];
  public form!: FormGroup;
  public formPer!: FormGroup;

  constructor(
    private cargoService:CargoService,
    private empleadoService:EmpleadosService,
    private personaService:PersonaService,
    private formBuilder: FormBuilder,
    private tipoIdService: TipoidService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.agregarCargos();
    this.agregarTipo();
    //this.agregarPersonas();
    
    this.formPer=this.formBuilder.group({
      idPersona: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      sexo: ['', Validators.required],
      fechaNac: ['', Validators.required],
      cel: ['', Validators.required],
      correo: ['', Validators.required],
      idTipo: ['', Validators.required]
    });
    this.form=this.formBuilder.group({
      fechaContratacion: ['', Validators.required],
      urlImagen: ['', Validators.required],
      cargo: ['', Validators.required],
      persona: ['', Validators.required]
    });
  }
  public agregarCargos(){
    this.cargoService.listarCargo().subscribe(cargos=>{
      this.cargos = cargos; 
    })
  }
  // public agregarPersonas(){
  //   this.personaService.listarPersona().subscribe(personas=>{
  //     this.personas = personas; 
  //   })
  // }
  public agregarTipo(){
    this.tipoIdService.listarTipo().subscribe(tipos=>{
      this.tipos = tipos; 
    })
  }
  public enviarData(){
      this.form.controls.persona.setValue(this.formPer.value);
      this.personaService.post(this.formPer.value).subscribe(persona=>{
        this.empleadoService.post(this.form.value).subscribe(data=>{
          this.router.navigate(["/administracion/empleados"]);
        })
      })
  }
  
  
}
