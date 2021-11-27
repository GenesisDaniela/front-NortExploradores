import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToursService } from 'src/app/administracion/services/tours.service';
import { PaqueteService } from 'src/app/services/paquete.service';
import { ViajesGrupalesService } from 'src/app/services/viajes-grupales.service';
import { MunicipioService } from 'src/app/administracion/services/municipio.service';
import { PaquetesService } from 'src/app/administracion/services/paquetes.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-viajes-grupales',
  templateUrl: './viajes-grupales.component.html',
  styleUrls: ['./viajes-grupales.component.css']
})
export class ViajesGrupalesComponent implements OnInit {

  public form!: FormGroup;
  public formTour !: FormGroup;
  public formPaq !: FormGroup;
  public formSol !: FormGroup;
  public municipios: any = [];
  public nombreUser!: string;
  public usuario: any;
  constructor(
    private tokenS: TokenService,
    private router: Router,
    private tourService: ToursService,
    private paqueteService: PaquetesService,
    private viajesGrupales: ViajesGrupalesService,
    private municipioService: MunicipioService,
    private formBuilder: FormBuilder,
    private usuarioSer: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.nombreUser = this.tokenS.getUserName();
    this.cargarToken();
    this.agregarMunicipio();
    this.cargarUsuario();


    this.form = this.formBuilder.group({
      destino: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(50)
        ])],
      pasajeros: ['',
        Validators.compose([
          Validators.required,
          Validators.min(10),
          Validators.max(50)
        ])],
      fechaSalida: ['',
        Validators.required
      ],
      fechaLlegada: ['',
        Validators.required
      ],
      descripcion: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(255)
        ])],
      nombre: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(100)
        ])],
      telefono: ['',
        Validators.compose([
          Validators.required,
          Validators.min(100000000),
          Validators.max(9999999999)
        ])],
      correo: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100)
        ])],
    });


  }
  cargarUsuario() {
    this.usuarioSer.usuarioPorUsername(this.nombreUser).subscribe(usuario => {
      this.usuario = usuario;
    })
  }
  public agregarMunicipio() {
    this.municipioService.listarMunicipio().subscribe(municipios => {
      this.municipios = municipios;
    })
  }
  public cargarToken() {
    if (this.tokenS.getToken()) {
    } else {
      this.router.navigateByUrl("/inicio");
    }
  }
  public enviarData() {
    this.formPaq.controls.precio.setValue(0);
    this.formPaq.controls.urlImagen.setValue("Pendiente");
    this.formPaq.controls.descripcion.setValue("Pendiente");
    this.formPaq.controls.recomendacion.setValue("Pendiente");
    this.formPaq.controls.nombre.setValue("Pendiente");
    this.formTour.controls.minCupos.setValue(0);
    this.formTour.controls.maxCupos.setValue(0);
    this.formTour.controls.paquete.setValue(this.formPaq.value);
    var solicitudTour = {
      "usuario": this.usuario,
      "tour": this.formTour.value,
      "descripcion": this.formSol.controls.descripcion.value
    }

    console.log(solicitudTour);

    this.viajesGrupales.post(this.formPaq.controls.municipio.value, solicitudTour).subscribe((data) => {

    })
  }
}
