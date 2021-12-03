import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-update-empleado',
  templateUrl: './update-empleado.component.html',
  styleUrls: ['./update-empleado.component.css']
})
export class UpdateEmpleadoComponent implements OnInit {

  id!:string;

  constructor(private aRoute : ActivatedRoute,
    private router: Router,
    private tokenS: TokenService,
    ) { 
    this.id=this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.cargarToken();
  }

  public cargarToken() {
    if (this.tokenS.getToken()) {
      if(this.tokenS.getAuthorities().length < 2){
      this.router.navigateByUrl("/inicio");
      }
    } else {
      this.router.navigateByUrl("/inicio");
    }
  }

}
