import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  isCollapsed = false;
  size: NzButtonSize = 'large';
  public idUsuario!:number;
  public usuario:any;
  public isLogged!:boolean;
  public isAdmin = false;
  public roles: string[] = [];
  public nombreUser="";

  log(): void {
    console.log('click dropdown button');
  }
  constructor(
    private usuarioSer: UsuarioService,
    private tokenS: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nombreUser=this.tokenS.getUserName(); 

  }

  onBack(): void {
    console.log('onBack');
  }

  volverInicio(){
    this.router.navigate(['/administracion']);
    
  }

}
