import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-informacion-pago',
  templateUrl: './informacion-pago.component.html',
  styleUrls: ['./informacion-pago.component.css']


})
export class InformacionPagoComponent implements OnInit {

  infoTransaccion:string[]= [];
  public usuario:any;
  public nombreUser!:string;
  public persona:any;
  public empresa:any

  public transaccion:any;
  public isLogged = false;
  public idTransaccion:any
  public transaction_id:any;
  public reference_sale:any;
  public date:any;
  public payment_method_type:any;
  public payment_method:any;
  public value:any
  public response_message_pol:any;
  
  constructor(
    private route:ActivatedRoute,
    private pagoService: TransaccionService,
    private usuarioService:UsuarioService,
    private tokenS: TokenService,
    private personaService: PersonaService,
    private empresaService: EmpresaService,
    private transaccionService: TransaccionService,
    private routes: ActivatedRoute,
    private router: Router


    
    ) { }

  ngOnInit(): void {

    this.nombreUser = this.tokenS.getUserName();
    this.cargarUsuario();
    this.cargarToken();
    this.cargarEmpresa();
    this.idTransaccion = this.routes.snapshot.paramMap.get("idTransaccion");
    if(this.idTransaccion==null){
      this.route.queryParams.subscribe(params=>{
        let body = new URLSearchParams();
          this.date = params.processingDate;
          this.payment_method = params.polPaymentMethod;
          this.payment_method_type = params.lapPaymentMethodType;
          this.response_message_pol = params.lapTransactionState;
          this.transaction_id = params.transactionId;
          this.reference_sale = params.referenceCode;
          
          body.set("transaction_id",params.transactionId);
          body.set("reference_sale",params.referenceCode);     
          body.set("date",params.processingDate);     
          body.set("payment_method_type",params.polPaymentMethodType);     
          body.set("payment_method",params.polPaymentMethod);
          body.set("attempts","1");     
          body.set("tax",params.TX_TAX);     
          body.set("shipping_country",params.currency);     
          body.set("description",params.description); 
          body.set("currency",params.currency);     
          body.set("value",params.TX_VALUE);     
          body.set("payment_method_name",params.lapPaymentMethodType);     
          body.set("email_buyer",params.buyerEmail);     
          body.set("payment_method_id",params.polPaymentMethod);  
          body.set("response_message_pol",params.lapTransactionState);
  
          body.forEach((data)=>{
            this.infoTransaccion.push(data);
            console.log(data);
          });
      })
    }else{
        console.log("aaa");
          this.transaccionService.encontrar(this.idTransaccion).subscribe(transaccion=>{
            this.transaccion = transaccion;
            console.log(transaccion);
          })
    }
    
    

  }

  cargarEmpresa(){
    this.empresaService.listarEmpresa().subscribe(empresa=>{
      this.empresa = empresa[0];
    })
  }

  cargarPersona(){
    this.usuarioService.pasajerosPorCliente(this.usuario.id_Usuario).subscribe(pasajeros=>{
      for (let i = 0; i < pasajeros.length; i++) {
        let pasajeroI = pasajeros[i];
        if(pasajeroI.esCotizante ==true){
          this.persona = pasajeroI.persona;
          console.log(this.persona);
        }
      }
    })

  }

  cargarUsuario(){
    this.usuarioService.usuarioPorUsername(this.nombreUser).subscribe(usuario=>{
      this.usuario=usuario;
      console.log(usuario);
      this.cargarPersona();
    })
  }

  public cargarToken() {
    if (this.tokenS.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
      console.log("aaaaa");
      this.router.navigateByUrl("/inicio");

    }
  }

}
