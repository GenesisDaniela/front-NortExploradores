import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlojamientosService } from 'src/app/administracion/services/alojamientos.service';
import { PaquetesService } from 'src/app/administracion/services/paquetes.service';

@Component({
  selector: 'app-add-paquete',
  templateUrl: './add-paquete.component.html',
  styleUrls: ['./add-paquete.component.css']
})
export class AddPaqueteComponent implements OnInit {

  public alojamientos: any = [];
  public form!: FormGroup;

  constructor(
    private alojamientoservice: AlojamientosService,
    private paqueteService: PaquetesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.agregarAlojamiento();
    this.form=this.formBuilder.group({
      precio:['', Validators.required],
      estado:['', Validators.required],
      urlImagen:['', Validators.required],
      descripcion:['', Validators.required],
      recomendacion:['', Validators.required],
      nombre:['', Validators.required],
      alojamiento:['', Validators.required]
    });
  }

  public agregarAlojamiento() {
    this.alojamientoservice.listarAlojamiento().subscribe(alojamientos => {
      this.alojamientos = alojamientos;
    })
  }

  public enviarData() {
    this.paqueteService.post(this.form.value).subscribe()
  }


}
