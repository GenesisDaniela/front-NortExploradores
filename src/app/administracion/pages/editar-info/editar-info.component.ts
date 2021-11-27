import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-editar-info',
  templateUrl: './editar-info.component.html',
  styleUrls: ['./editar-info.component.css']
})
export class EditarInfoComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioS: UsuarioService,
    private tokenS: TokenService,
    private router : Router,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id_Usuario:['',Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      imgUrl: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['', Validators.required],
      estado: ['', Validators.required],
    });
    
   
    this.usuarioS.usuarioPorUsername(this.tokenS.getUserName()).subscribe(usuario => {
      this.form.setValue({
        id_Usuario:usuario.id_Usuario,
        username: usuario.username,
        email: usuario.email,
        imgUrl: usuario.imgUrl,
        password: usuario.password,
        roles:usuario.roles,
        estado:usuario.estado,
      });
    })
  }

  guardarUsuario() {
    this.usuarioS.post(this.form.value).subscribe(user=>{
      console.log(user);
      this.router.navigate(["/administracion"]);
      this.toastr.success('Administrador editado correctamente', 'OK',{
        positionClass: 'toast-bottom-right'
      });

    })
  }



}
