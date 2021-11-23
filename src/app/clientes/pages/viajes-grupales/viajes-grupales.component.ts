import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-viajes-grupales',
  templateUrl: './viajes-grupales.component.html',
  styleUrls: ['./viajes-grupales.component.css']
})
export class ViajesGrupalesComponent implements OnInit {

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
      this.router.navigateByUrl("/login");
    }
  }
}
