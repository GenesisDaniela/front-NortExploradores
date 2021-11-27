import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent implements OnInit {

  public form !: FormGroup;

  constructor(
    private tokenS: TokenService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarToken();
    
    this.form = this.formBuilder.group({      
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
  public cargarToken() {
    if (this.tokenS.getToken()) {
    } else {
      this.router.navigateByUrl("/inicio");
    }
  }

  public enviarData(){
    console.log('hola');
  }

}


