import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  idTipo = 0;
  nombre="";
  email=""
  password=""
  errMsj?: string;
  isLogged = false;
  registroInfo!:FormGroup;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.registroInfo = this.fb.group({
      nuevoUsuario:{
        nombreUsuario:['',Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25)
        ])],
        email:['',Validators.compose([
          Validators.required, 
          Validators.email
        ])],
        password:['',Validators.compose([
          Validators.required, 
          Validators.minLength(5),
          Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$")
        ])]
      },
      persona:{
        idPersona: ['', Validators.compose([
          Validators.required,
          Validators.min(10000000),
          Validators.max(999999999)]
        )],
        nombre: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)]
        )],
        apellido: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ])],
        sexo: ['', Validators.compose([Validators.required])],
        fechaNac: ['', Validators.compose([Validators.required])],
        cel: ['', Validators.compose([
          Validators.required,
          Validators.min(3000000000),
          Validators.max(3999999999)]
        )],
        correo: ['', Validators.compose([
          Validators.required, 
          Validators.email]
        )],
        estado: [1, [Validators.required]]
      }
    })
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  
  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombreUsuario, this.email, this.password);
    this.authService.nuevo(this.nuevoUsuario).subscribe( data => {
      },msg=>{
        console.log(msg);
        if(msg.status ==200){
          this.toastr.success('Cuenta Creada', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
        this.router.navigate(['/login']);
        }else{
          this.toastr.error(msg.error, 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
        }
      }
    );
  }

}
