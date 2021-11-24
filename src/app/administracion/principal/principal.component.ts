import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SolicitudpaqueteService } from '../services/solicitudpaquete.service';
import * as global from 'global'
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  isCollapsed = false;
  public uri = global.url_front;
  size: NzButtonSize = 'large';
  public idUsuario!:number;
  public usuario:any;
  public isLogged!:boolean;
  public isAdmin = false;
  public roles: string[] = [];
  public nombreUser="";
  public totalSolicitudes = 0;
  log(): void {
    console.log('click dropdown button');
  }
  constructor(
    private usuarioSer: UsuarioService,
    private tokenS: TokenService,
    private router: Router,
    private soli: SolicitudpaqueteService,
  ) { }

  ngOnInit(): void {
    this.nombreUser=this.tokenS.getUserName();
    this.cargarSolicitudes();

  }
  redireccionar(ruta:String){
    window.location.href=this.uri+"/"+ruta
    
  }
  cargarSolicitudes(){
    this.soli.cantidadSolicitudes().subscribe(total=>{
      this.totalSolicitudes = total;
      console.log(this.totalSolicitudes);
      const out = document.getElementById("numeroTotal");
      console.log(out);
      if(out) out.innerHTML = this.totalSolicitudes+"";
    })
  }

  onLogOut(): void {
    this.tokenS.logOut();
  }

  onBack(): void {
    console.log('onBack');
  }

  volverInicio(){
    this.router.navigate(['/administracion']);
    
  }

}
