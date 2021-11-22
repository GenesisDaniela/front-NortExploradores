import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-maleta',
  templateUrl: './maleta.component.html',
  styleUrls: ['./maleta.component.css']
})
export class MaletaComponent implements OnInit {
  isLogged = false;

  constructor(    
    private tokenS: TokenService,
    private router: Router
    ) { 

  }

  ngOnInit(): void {
    this.cargarToken();

  }

  public cargarToken() {
    if (this.tokenS.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
      this.router.navigateByUrl("/inicio");

    }
  }
}
