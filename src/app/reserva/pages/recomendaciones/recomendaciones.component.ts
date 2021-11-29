import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { SugerenciasService } from '../../../services/sugerencias.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent implements OnInit {

  public idUsuario!:number;
  public nombreUser!:string;
  public usuario:any;

  public form!: FormGroup;

  constructor(
    private usuarioSer: UsuarioService,
    private tokenS: TokenService,
    private formBuilder: FormBuilder,
    private router: Router,
    private recomendacion: SugerenciasService,
    private toastr: ToastrService    
  ) { }

  ngOnInit(): void {
    this.nombreUser=this.tokenS.getUserName(); 
    this.cargarUsuario();
    this.cargarToken();  
    
    
    this.form = this.formBuilder.group({   
      descripcion: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(255)
        ])],
        usuario: ['',Validators.required
      ] 
    });

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

  public enviarData(){
    
    this.form.controls.usuario.setValue(this.idUsuario)
    
    this.recomendacion.enviarDatos(this.form.value).subscribe(data=>{
      this.toastr.success("Sugerencia Agregada!", "Registrada", {
        positionClass: 'toast-top-center'
       }) 
      this.router.navigateByUrl("/inicio")
    })
  }

}


