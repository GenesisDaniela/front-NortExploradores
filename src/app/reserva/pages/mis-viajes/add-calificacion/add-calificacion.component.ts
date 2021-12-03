import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { CompraService } from '../../../../services/compra.service';
import { TokenService } from '../../../../services/token.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  public idCompra:string|null;
  public idTour!: number;
  public idCompra2!:number;
  public nombrePaq!:string;
  

  constructor(
    private usuarioSer: UsuarioService,
    private comprasSer: CompraService,
    private tokenS: TokenService,
    private router: Router,
    private calificacion: CalificacionService,
    private formBuilder: FormBuilder,
    private aRouter: ActivatedRoute,
    private toastr: ToastrService 

  ) { this.idCompra = aRouter.snapshot.paramMap.get('idCompra');
    }

  ngOnInit(): void {

    this.cargarToken();  
    this.nombreUser=this.tokenS.getUserName(); 
    this.cargarUsuario();

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
        ])],
        usuario: ['',
      Validators.required],
      tour: ['',
      Validators.required]       
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
      
      this.compararCompra(this.idCompra,this.comprasUsuario)
      
    }) 
  } 
  
    public compararCompra(id: string | null, comprasUsuario: any[]) {
      for( let iterator of comprasUsuario){  
       
                 
        if(id==iterator.idCompra){          
         this.idTour=iterator.tour.idTour
         this.nombrePaq=iterator.tour.paquete.nombre
         
         this.nombrePaquete(this.nombrePaq)
        }  
      }
      
    } 

  public enviarData(){
    
    
    this.form.controls.usuario.setValue(this.idUsuario)
    this.form.controls.tour.setValue(this.idTour)
    
    
    this.calificacion.post(this.form.value).subscribe(data=>{
      this.toastr.success("Calificación Agregada!", "Registrada", {
        positionClass: 'toast-top-center'
       }) 
      this.router.navigateByUrl("/misViajes")
    })
  }

  public nombrePaquete(nombre:any){
    const nombrePaq = document.getElementById("nomPaquete")
    if(nombrePaq) nombrePaq.innerHTML=nombre
    
  }

}
