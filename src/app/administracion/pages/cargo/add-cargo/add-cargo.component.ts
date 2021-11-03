import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargoService } from 'src/app/services/cargo.service';

@Component({
  selector: 'app-add-cargo',
  templateUrl: './add-cargo.component.html',
  styleUrls: ['./add-cargo.component.css']
})
export class AddCargoComponent implements OnInit {

  public cargos: any = [];
  public form !: FormGroup;
  
  constructor(
    private cargoService: CargoService,
    private formBuilder:FormBuilder
  ) {}

  ngOnInit(): void {
    this.form=this.formBuilder.group({ 
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      sueldo: ['', Validators.required],
    });
  }

  public enviarData(){
    this.cargoService.post(this.form.value).subscribe()
      
  }

}
