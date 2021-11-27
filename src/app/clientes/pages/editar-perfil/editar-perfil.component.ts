import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { TokenService } from '../../../services/token.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from '../../../services/persona.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  public idUsuario!:number;
  public nombreUser!:string;
  public usuario:any;

  constructor(
    private usuarioSer: UsuarioService,
    private personaSer: PersonaService,
    private tokenS: TokenService,
    private formBuilder: FormBuilder,
    private router: Router,    
    
  ) { }

  ngOnInit(): void {
    this.nombreUser=this.tokenS.getUserName(); 
    this.cargarUsuario();
    this.cargarToken();  
  }

  public cargarToken() {
    if (this.tokenS.getToken()) {
    } else {
      this.router.navigateByUrl("/inicio");
    }
  }

  cargarUsuario(){
    this.usuarioSer.usuarioPorUsername(this.nombreUser).subscribe(usuario=>{
      this.usuario=usuario;
      this.idUsuario = usuario.id_Usuario; 
      console.log(usuario)     
    })
  }

  /* cargarPersona(){
    this.personaSer.getPersona(this.nombreUser).subscribe(usuario=>{
      this.usuario=usuario;
      this.idUsuario = usuario.id_Usuario; 
      console.log(usuario)     
    })
  } */
}
