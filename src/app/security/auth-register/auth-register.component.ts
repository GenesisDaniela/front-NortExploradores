import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { NuevoUsuario } from '../models/nuevo-usuario';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
})
export class AuthRegisterComponent implements OnInit {

  nuevoUsuario?: NuevoUsuario;
  nombreUsuario="";
  email=""
  password=""
  errMsj?: string;
  isLogged = false;


  constructor(private tokenService: TokenService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }
  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombreUsuario, this.email, this.password);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        // this.toastr.success('Cuenta Creada', 'OK', {
        //   timeOut: 3000, positionClass: 'toast-top-center'
        // });
        this.router.navigate(['/login']);
      },
      err => {
        this.errMsj = err.error.mensaje;
        window.alert(this.errMsj);
        // this.toastr.error(this.errMsj, 'Fail', {
        //   timeOut: 3000,  positionClass: 'toast-top-center',
        // });
        // console.log(err.error.message);
      }
    );
  }

}
