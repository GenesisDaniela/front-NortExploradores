import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as crypto from "crypto-js";
import { CompraService } from 'src/app/services/compra.service';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-informacion-transaccion',
  templateUrl: './informacion-transaccion.component.html',
  styleUrls: ['./informacion-transaccion.component.css']
})
export class InformacionTransaccionComponent implements OnInit {

  public idTransaccion:any
  public transaction_id:any;
  public reference_sale:any;
  public date:any;
  public payment_method_type:any;
  public payment_method:any;
  public value:any
  public response_message_pol:any;
  public compra:any;

  public isPagoParcial = false;
  public isPagoTotal = false;
  public isPagoCancelado = false;


  constructor(
    private route: ActivatedRoute,
    private compraService: CompraService
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      let body = new URLSearchParams();
        this.date = params.processingDate;
        this.payment_method = params.polPaymentMethod;
        this.payment_method_type = params.lapPaymentMethodType;
        this.response_message_pol = params.lapTransactionState;
        this.transaction_id = params.transactionId;
        this.reference_sale = params.referenceCode;
        
        this.compraService.encontrar(this.reference_sale).subscribe(compra=>{
          this.compra = compra;
          console.log(compra);
          if(compra.estado=="CANCELADO" || compra.estado=="PENDIENTE" ) this.isPagoCancelado=true
          if(compra.estado=="PAGADO") this.isPagoTotal =true;
          if(compra.estado =="PAGO_PARCIAL") this.isPagoParcial =true;

        })

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


    })
  }
  generarReferencia():string{
    const fecha = new Date();
    return Math.round((Math.random()*25544))+""+Math.round(fecha.getMilliseconds());
  }
}
