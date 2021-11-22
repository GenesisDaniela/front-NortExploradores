import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent implements OnInit {

  constructor(
    private tokenS: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarToken();

  }
  public cargarToken() {
    if (this.tokenS.getToken()) {
    } else {
      this.router.navigateByUrl("/inicio");
    }
  }
}

