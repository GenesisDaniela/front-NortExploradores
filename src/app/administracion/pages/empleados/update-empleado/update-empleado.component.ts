import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-empleado',
  templateUrl: './update-empleado.component.html',
  styleUrls: ['./update-empleado.component.css']
})
export class UpdateEmpleadoComponent implements OnInit {

  id!:string;

  constructor(private aRoute : ActivatedRoute) { 
    this.id=this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
  }

}
