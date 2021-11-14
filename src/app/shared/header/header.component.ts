import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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
  
  public nombreUser!:string;
  constructor(
    private usuarioSer: UsuarioService,
    private tokenS: TokenService
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

  cargarUsuario(){
    this.usuarioSer.usuarioPorUsername(this.nombreUser).subscribe(usuario=>{
      this.usuario=usuario;
      const output = document.getElementById('nombreUser');
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
