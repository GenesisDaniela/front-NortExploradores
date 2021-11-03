import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AlojamientosService } from 'src/app/administracion/services/alojamientos.service';



@Component({
  selector: 'app-add-alojamiento',
  templateUrl: './add-alojamiento.component.html',
  styleUrls: ['./add-alojamiento.component.css']
})
export class AddAlojamientoComponent implements OnInit {
  public form !: FormGroup;


  constructor(
    private alojamientosservice: AlojamientosService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    
      this.form = this.formBuilder.group({
      nombre:['', Validators.required],
      dir:['', Validators.required],
      descripcion:['', Validators.required],
      precio:['', Validators.required]
    });
  }

  public enviarData() {
    this.alojamientosservice.post(this.form.value).subscribe()
  }
}
