import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { CompraService } from '../../../../services/compra.service';
import { TokenService } from '../../../../services/token.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CalificacionService } from '../../../../services/calificacion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-calificacion',
  templateUrl: './add-calificacion.component.html',
  styleUrls: ['./add-calificacion.component.css']
})
export class AddCalificacionComponent implements OnInit {

  public idUsuario!:number;
  public usuario:any;
  public nombreUser!:string;
  public compras: any;  
  public comprasUsuario: any[]=[];  
  public form!: FormGroup;

  constructor(
    private usuarioSer: UsuarioService,
    private comprasSer: CompraService,
    private tokenS: TokenService,
    private router: Router,
    private calificacion: CalificacionService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService 
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({   
      puntuacion: ['',
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(5)
        ])],
        comentario: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(255)
        ])]      
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
      this.cargarPaquetesComprados(this.idUsuario);
    })
  }

  public cargarPaquetesComprados(id: number) {
    this.comprasSer.compras().subscribe((compras: any) => {
      this.compras = compras;
      
      for(const iterator of compras){               
        if(id===iterator.usuario.id_Usuario){          
          this.comprasUsuario.push(iterator)
        }  
      }
      

    }) 
  }    

  public enviarData(){
    
   /*  this.form.controls.usuario.setValue(this.idUsuario) */
    
    this.calificacion.post(this.form.value).subscribe(data=>{
      this.toastr.success("Calificación Agregada!", "Registrada", {
        positionClass: 'toast-top-center'
       }) 
      this.router.navigateByUrl("/calificar")
    })
  }

}
