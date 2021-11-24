import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as global from 'global'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public usuarioLogin: any;
  public idUsuario!:number;
  public usuario:any;
  public isLogged!:boolean;
  public seleccionado!:string;
  public url_front!:string;
  public isAdmin = false;
  public roles: string[] = [];
  public uri=global.url_front;
  public nombreUser!:string;
  constructor(
    private usuarioSer: UsuarioService,
    private tokenS: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nombreUser=this.tokenS.getUserName(); 
    this.cargarUsuario();
    this.roles = this.tokenS.getAuthorities();
    this.isAdministrador();
    if (this.tokenS.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    } 
  }

  onLogOut(): void {
    this.tokenS.logOut();
    window.location.reload();
    
  }

  redireccionar(ruta:String){
    window.location.href=this.uri+"/"+ruta
  }

  cargarUsuario(){
    this.usuarioSer.usuarioPorUsername(this.nombreUser).subscribe(usuario=>{
      this.usuario=usuario;
      const output = document.getElementById('nombreUser');
      const output2 = document.getElementById('bienvenido');
      if (output2) output2.setAttribute("style","")

      if (output) output.innerHTML = "Bienvenido, "+this.nombreUser
    })
  }

  public cambiarSeleccionado(){

  } 


  isAdministrador(){
    if(this.roles.length == 2){
      this.isAdmin=true;
    }
  }


  public inicializarUsuario() {
    this.usuarioSer
      .usuarioPorId(this.idUsuario)
      .subscribe((usuario) => {
        this.usuarioLogin = usuario;
        console.log(this.usuarioLogin);
      });
  }
}
