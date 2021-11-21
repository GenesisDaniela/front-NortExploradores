import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {
  public idUsuario!:number;
  public usuario:any;
  public nombreUser!:string;
  public reservas: any;
  constructor(
    private usuarioSer: UsuarioService,
    private tokenS: TokenService
  ) { }

  ngOnInit(): void {
    this.nombreUser=this.tokenS.getUserName(); 
    this.cargarUsuario();
  }

  cargarUsuario(){
    this.usuarioSer.usuarioPorUsername(this.nombreUser).subscribe(usuario=>{
      this.usuario=usuario;
      this.idUsuario = usuario.id_Usuario;
      this.cargarReservas();
    })
  }

  public cargarReservas(){
    this.usuarioSer.comprasReservadasUsuario(this.idUsuario).subscribe((reservas: any)=>{
      this.reservas = reservas;
    })
  }
}
