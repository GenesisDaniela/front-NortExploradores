import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompraService } from 'src/app/services/compra.service';
import { DetcompraService } from 'src/app/services/detcompra.service';
import { PaqueteService } from 'src/app/services/paquete.service';
import { PersonaService } from 'src/app/services/persona.service';
import { TipoidService } from 'src/app/services/tipoid.service';
import { TokenService } from 'src/app/services/token.service';
import { TourService } from 'src/app/services/tour.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as crypto from "crypto-js";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-pagos',
  templateUrl: './form-pagos.component.html',
  styleUrls: ['./form-pagos.component.css']

})
export class FormPagosComponent implements OnInit {
  pagosInfo!: FormGroup;
  public paquetes: any = [];
  public tours: any = [];
  public persona: any
  public tourSeleccionado: any;
  public cuposDisponibles: any;

  public total = 0;
  public totalCompra = 0
  public totalCompra50p = 0

  public pasajerosFrec: any = [];
  public tipoId: any = [];
  public pasajerosFrecElegidos: any = [];
  public pasajerosTotal: any = [];
  public pasajerosClasificados: any = [];

  public idPaquete: any;

  public usuario: any;
  public isLogged!: boolean;
  public pagosForm!: FormGroup;

  public nombreUser!: string;

  // Info page pago 2
  public infoPagina = 1;
  public idCompra = this.generarReferencia();

  public costoUnit!: number;

  //payu variables

  referenciaUnic = this.generarReferencia();
  iva = 0.19;
  moneda = "COP";
  apikey = "jR9INc85abuxxkcn1Xn1hqZe5P";

  idCuenta = "957106";
  idMercado = "949518";

  email = ""
  nombrePersona = "";

  idUsuario = "";
  descripcion = "";

  url = `https://nortexploradores.herokuapp.com/pagos/confirmacion`;

  firmaElectronica!: string
  firmaElectronicaMD5!: string

  // test =================================================================
  idCuentaTest = "512321";
  apikeyTest = "4Vj8eK4rloUd272L48hsrarnUA";

  firmaElectronicaTest = `${this.apikeyTest}~508029~${this.referenciaUnic}~${this.total}~${this.moneda}`;
  firmaElectronicaMD5Test = crypto.MD5(this.firmaElectronicaTest).toString();


  constructor(
    private paqueteService: PaqueteService,
    private usuarioService: UsuarioService,
    private tipoIdService: TipoidService,
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private tokenS: TokenService,
    private formBuilder: FormBuilder,
    private tourService: TourService,
    private compraService: CompraService,
    private detalleCompra: DetcompraService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.nombreUser = this.tokenS.getUserName();
    this.cargarUsuario();
    this.agregarPaquetes();
    this.cargarToken();
    this.listarTour();
    this.generarReferencia();
    this.cargarPasajerosClasificados();
    this.referenciaUnic = this.generarReferencia()
    if (this.idPaquete == null) this.idPaquete = "paq-1";
    this.idPaquete = this.route.snapshot.paramMap.get("idPaq");

    this.pagosInfo = this.formBuilder.group({
      paquete: [],
      total: [],
      pasajeros: this.formBuilder.array([])
    })

    this.tipoIdService.getTipoId().subscribe(ids => {
      this.tipoId = ids
    })

  }

  get pasajerosDeGrupos() {
    return this.pagosInfo.get('pasajeros') as FormArray
  }


  agregarPasajero(tipoid = "", documento = "", nombre = "", apellido = "", sexo = "", fechaNac = "", celular = "", correo = "") {
    this.total++;
    let persona = this.pagosInfo.get('pasajeros') as FormArray;
    console.log("aaaa");
    persona.push(this.formBuilder.group({
      idTipo: [tipoid, [Validators.required]],
      idPersona: [documento, [Validators.required]],
      nombre: [nombre, [Validators.required]],
      apellido: [apellido, [Validators.required]],
      sexo: [sexo, [Validators.required]],
      fechaNac: [fechaNac, [Validators.required]],
      cel: [celular, [Validators.required]],
      correo: [correo, [Validators.required]],
      estado: [1, [Validators.required]]
    }));

    this.toastr.success('Pasajero agregado', 'OK', {
      timeOut: 3000, positionClass: 'toast-top-center'
    });
  }

  eliminarPasajero(i: number, pasajero: any) {
    let pasajeros = this.pagosInfo.get('pasajeros') as FormArray;
    if (this.total > 0)
      this.total--;
    let fechaNacPasajero = pasajero.fechaNac;

    let edadPasajero = this.calcularfecha(fechaNacPasajero);
    let valorPaquete = parseInt(this.tourSeleccionado.paquete.precio + "");

    if (edadPasajero <= 4) {
      if (this.pasajerosClasificados[0].cantidad > 0)
        this.pasajerosClasificados[0].cantidad -= 1;
      this.pasajerosClasificados[3].cantidad -= 1;

      if (this.pasajerosClasificados[0].precio > 0)
        this.pasajerosClasificados[0].precio = 10000;
      this.pasajerosClasificados[3].precio -= this.pasajerosClasificados[0].precio;

    }

    if (edadPasajero > 4 && edadPasajero < 13) {
      if (this.pasajerosClasificados[1].cantidad > 0) {
        this.pasajerosClasificados[1].cantidad -= 1;
        this.pasajerosClasificados[3].cantidad -= 1;
      }

      if (this.pasajerosClasificados[1].precio > 0) {
        this.pasajerosClasificados[1].precio -= (valorPaquete - 10000); //por confirmar
        this.pasajerosClasificados[3].precio -= this.pasajerosClasificados[1].precio;
      }
    }

    if (edadPasajero > 12) {
      if (this.pasajerosClasificados[2].cantidad > 0) {
        this.pasajerosClasificados[2].cantidad -= 1;
        this.pasajerosClasificados[3].cantidad -= 1;
      }


      if (this.pasajerosClasificados[2].precio > 0) {
        this.pasajerosClasificados[2].precio -= valorPaquete;
        this.pasajerosClasificados[3].precio -= this.pasajerosClasificados[2].precio;
      }

    }

    pasajeros.removeAt(i);
    console.log("pasajeros eliminados form:" + pasajeros.value);
    console.log("pasajeros clasificados:" + this.pasajerosClasificados);
  }

  createpagosInfo() {
    const compra = document.getElementById("comprastep");

    console.log('data is ', this.pagosInfo.value.pasajeros);
    let datosIncorrectos: Boolean = false;
    let msg = "";

    let personas = this.pagosInfo.value.pasajeros;
    let pasajeros = [];

    if (this.tourSeleccionado == undefined) {
      datosIncorrectos = true
      if (compra) compra?.classList.add("fail")
      msg = "¡Debes seleccionar un tour!";
    } else {
      if (this.tourSeleccionado.cantCupos == 0) {
        datosIncorrectos = true
        if (compra) compra?.classList.add("fail")
        msg = "¡No hay cupos disponibles para el tour!";
      } else {
        if (compra) compra?.classList.remove("fail")
      }
    }

    for (let i = 0; i < personas.length && datosIncorrectos == false; i++) {
      let pasajero = personas[i];
      let idPerson = pasajero.idPersona;
      let nombre = pasajero.nombre;
      let sexo = pasajero.sexo;
      let fechaNac = pasajero.fechaNac;
      let cel = pasajero.cel;
      let correo = pasajero.correo;

      if (pasajero == '' || idPerson == '' || nombre == '' || fechaNac == '' || cel == '' || correo == '') {
        datosIncorrectos = true;
        if (compra) compra?.classList.add("fail")
        msg = "!Los campos no pueden ser vacíos!"
        break;
      }


      let fechaNacPasajero = pasajero.fechaNac;
      let edadPasajero = this.calcularfecha(fechaNacPasajero);
      let valorPaquete = parseInt(this.tourSeleccionado.paquete.precio + "");

      if (edadPasajero <= 4) {
        this.pasajerosClasificados[0].cantidad += 1;
        this.pasajerosClasificados[0].precio = 10000;
        this.totalCompra += 10000
      }

      if (edadPasajero > 4 && edadPasajero < 13) {
        this.pasajerosClasificados[1].cantidad += 1;
        this.pasajerosClasificados[1].precio += (valorPaquete - 10000);
        this.totalCompra += (valorPaquete - 10000);
        this.pasajerosClasificados[3].cantidad += 1;

      }

      if (edadPasajero > 12) {
        this.pasajerosClasificados[2].cantidad += 1;
        this.pasajerosClasificados[2].precio += valorPaquete;
        this.totalCompra += (valorPaquete);
        this.pasajerosClasificados[3].cantidad += 1;
      }


      this.personaService.getPersona(pasajero.idPersona).subscribe(persona => {
        var pasajeroPost;
        let pasajero = persona;
        if (pasajero == null) {
          pasajeroPost = {
            "idPasajero": null,
            "esCotizante": false,
            "persona": pasajero,
            "usuario": this.usuario.id_Usuario
          }
        } else {
          pasajeroPost = {
            "idPasajero": pasajero.idPasajero,
            "esCotizante": false,
            "persona": pasajero,
            "usuario": this.usuario.id_Usuario
          }
        }

        this.pasajerosTotal.push(pasajeroPost);
        pasajeros.push(pasajeroPost)
      });

      var pasajeroPost = {
        "idPasajero": null,
        "esCotizante": false,
        "persona": pasajero,
        "usuario": this.usuario.id_Usuario
      }
      this.pasajerosTotal.push(pasajeroPost);
      pasajeros.push(pasajeroPost)
    }
    const output = document.getElementById("errorPresentado");
    if (output) output.innerHTML = "";

    if (datosIncorrectos == true) {
      if (compra) output?.classList.add("fail")
      this.toastr.error(msg, 'ERROR', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      return;

    } else {
      if (compra) output?.classList.remove("fail")
      if (output) output.innerHTML = "";
    }

    let pasajeross = this.pagosInfo.get('pasajeros') as FormArray;

    for (let i = 0; i < pasajeros.length; i++) {
      pasajeros[i].idPasajero = pasajeross.at(i).value.idPasajero;
    }
    this.usuarioService.guardarPasajerosDeUsuario(this.usuario.id_Usuario, pasajeros).subscribe(pasajeros => {
      this.pasajerosTotal = pasajeros;

      if (compra) {
        compra?.classList.add("complete")
        compra?.classList.remove("pendiente")
      }

      this.toastr.success("Datos correctos", 'Ok', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });

      this.infoPagina = 2;
      this.totalCompra50p = (this.totalCompra)-this.totalCompra*0.5;

      window.scroll(0,0);
      const factura = document.getElementById("facturastep");
      if (factura) factura?.classList.add("pendiente")


      let pasajeross = this.pagosInfo.get('pasajeros') as FormArray;
      this.descripcion = "Pago de (" + pasajeross.length + ") paquete(s) turistico(s) destino: " + this.tourSeleccionado.paquete.municipio.nombre
      this.pagosInfo.markAllAsTouched();
    });



  }


  cargarPasajerosClasificados() {
    this.pasajerosClasificados = []
    for (let i = 0; i < 4; i++) {

      if (i == 3) {
        this.pasajerosClasificados.push({
          total: 0,
          cantidad: 0
        })
      } else {
        var pasajerosClasificados = {
          cantidad: 0,
          precio: 0
        }
        this.pasajerosClasificados.push(pasajerosClasificados)
      }
    }
  }

  cargarUsuario() {
    this.usuarioService.usuarioPorUsername(this.nombreUser).subscribe(usuario => {
      this.usuario = usuario;

      this.agregarPasajerosFrec();
    })
  }

  public cargarToken() {
    if (this.tokenS.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public agregarPaquetes() {
    this.paqueteService.listar().subscribe(paquetes => {
      this.paquetes = paquetes;
    })
  }

  public listarTour() {
    this.tourService.listarTourActivo().subscribe(tour => {
      this.tours = tour
    })
  }

  public agregarPasajerosFrec() {
    this.usuarioService.pasajerosPorCliente(this.usuario.id_Usuario).subscribe(pasajeros => {
      this.cargarPasajeros(pasajeros);
    })
  }

  public cargarPasajeros(pasajeros: any) {

    for (let i = 0; i < pasajeros.length; i++) {
      let pasajero = pasajeros[i];
      if (pasajero.esCotizante == false) {
        this.pasajerosFrec.push(pasajero);

      } else {
        this.persona = pasajeros[i].persona;
        this.total++;
        let pasajeroX = this.pagosInfo.get('pasajeros') as FormArray;

        pasajeroX.push(
          this.formBuilder.group({
            idTipo: [this.persona.idTipo.idTipo, [Validators.required]],
            idPersona: [this.persona.idPersona, [Validators.required]],
            nombre: [this.persona.nombre, [Validators.required]],
            apellido: [this.persona.apellido, [Validators.required]],
            sexo: [this.persona.sexo, [Validators.required]],
            fechaNac: [this.persona.fechaNac, [Validators.required]],
            cel: [this.persona.cel, [Validators.required]],
            correo: [this.persona.correo, [Validators.required]],
            idPasajero: [pasajeros[i].idPasajero]
          }));
      }
    }
  }
  public actualizarPasajeros(event: any) { //metodo para agregar un pasajero o eliminarlo si se vuelve a seleccionar
    let pasajeros = this.pagosInfo.get('pasajeros') as FormArray;


    let idPasajero = event.target.value;
    console.log(idPasajero);
    let yaResgistrado = false;
    let posEliminar = -1 //posicion del pasajero que se encontro y se va a eliminar.
    for (let i = 0; i < pasajeros.length; i++) {
      if (pasajeros.at(i).value.documento == idPasajero) {
        yaResgistrado = true;
        posEliminar = i; // la posicion que eliminare del form builder
        break;
      }
    }

    if (yaResgistrado) {
      pasajeros.removeAt(posEliminar);
      if (this.total > 0)
        this.total--;
    } else {
      //busco a la persona y cargo sus datos en el form.
      this.total++;
      this.personaService.getPasajero(idPasajero).subscribe(pasajero => {
        this.toastr.success("Pasajero frecuente agregado: " + pasajero.persona.nombre, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        let persona = pasajero.persona;
        pasajeros = this.pagosInfo.get('pasajeros') as FormArray;
        pasajeros.push(this.formBuilder.group({
          idTipo: [persona.idTipo.idTipo, [Validators.required]],
          idPersona: [persona.idPersona, [Validators.required]],
          nombre: [persona.nombre, [Validators.required]],
          apellido: [persona.apellido, [Validators.required]],
          sexo: [persona.sexo, [Validators.required]],
          fechaNac: [persona.fechaNac, [Validators.required]],
          cel: [persona.cel, [Validators.required]],
          correo: [persona.correo, [Validators.required]],
          idPasajero: [pasajero.idPasajero]
        }));
      })


    }
  }

  // Segunda vista ----->

  cargarTour(event: any) {
    let idTourSeleccionado = event.target.value;
    this.tourSeleccionado = this.tourService.encontrarTour(idTourSeleccionado).subscribe(tour => {
      this.tourSeleccionado = tour;
      this.cuposDisponibles = tour.cantCupos;
      const output = document.getElementById('cantidadCupos');
      if (output) output.innerHTML = tour.cantCupos;
    })
  }

  generarReferencia(): string {
    const fecha = new Date();
    return Math.round((Math.random() * 45644)) + "" + Math.round(fecha.getMilliseconds());
  }


  calcularfecha(birthDate: any) {
    birthDate = new Date(birthDate);
    let otherDate = new Date();

    var years = (otherDate.getFullYear() - birthDate.getFullYear());

    if (otherDate.getMonth() < birthDate.getMonth() ||
      otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
      years--;
    }

    return years;
  }

  volverPag() {
    this.cargarPasajerosClasificados()
    this.infoPagina = 1
    window.scroll(0,0);
    const compra = document.getElementById("comprastep");
    if (compra) {
      compra?.classList.add("pendiente")
      compra?.classList.remove("complete")
    }
    const factura = document.getElementById("facturastep");
    if (factura) {
      factura?.classList.remove("pendiente")
      factura?.classList.remove("complete")

    }

    this.totalCompra = 0
  }

  volverPag2(){
    this.infoPagina=2
    const pago = document.getElementById("pagostep");
    if (pago){
      pago?.classList.remove("pendiente")
      pago?.classList.remove("complete")
    } 
  }

  cargarPayu() {

    this.infoPagina = 3
    window.scroll(0,0);
    const factura = document.getElementById("facturastep");
      if (factura){
        factura?.classList.remove("pendiente")
        factura?.classList.add("complete")
      } 

      const pago = document.getElementById("pagostep");
      if (pago){
        pago?.classList.add("pendiente")
        pago?.classList.remove("complete")
      } 
    this.totalCompra = this.totalCompra - this.totalCompra * 0.5
    this.idUsuario = this.usuario.id_Usuario
    this.email = this.persona.correo
    this.nombrePersona = this.persona.nombre + " " + this.persona.apellido

    let pasajeros = this.pagosInfo.get('pasajeros') as FormArray;
    this.descripcion = "Pago de (" + pasajeros.length + ") paquete(s) turistico(s) destino: " + this.tourSeleccionado.paquete.municipio.nombre

    this.firmaElectronica = `${this.apikey}~${this.idMercado}~${this.idCompra}~${this.totalCompra}~${this.moneda}`;
    this.firmaElectronicaMD5 = crypto.MD5(this.firmaElectronica).toString();

    // Pruebas

    this.firmaElectronicaTest = `${this.apikeyTest}~508029~${this.idCompra}~${this.totalCompra}~${this.moneda}`;
    this.firmaElectronicaMD5Test = crypto.MD5(this.firmaElectronicaTest).toString();

  }

  guardarCompra(form: HTMLFormElement) {

    var compra = {
      idCompra: this.idCompra,
      cantidadPasajeros: this.total,
      totalCompra: this.totalCompra,
      estado: "PENDIENTE",
      usuario: this.usuario.id_Usuario,
      tour: this.tourSeleccionado.idTour
    }

    this.toastr.warning("Cargando...", 'Espere', {
      timeOut: 3000, positionClass: 'toast-top-center'
    });

    this.compraService.post(compra, this.tourSeleccionado.idTour).subscribe(compra => {

      console.log("La compra es:", compra);

      let pasajeros = this.pagosInfo.get('pasajeros') as FormArray;
      let detalleCompras = [];
      let personas = this.pagosInfo.value.pasajeros;



      for (let i = 0; i < pasajeros.length; i++) {
        let edadPasajero = this.calcularfecha(personas[i].fechaNac);
        let valorUnit = 0;
        let valorPaquete = this.tourSeleccionado.paquete.precio;

        if (edadPasajero <= 4) {
          valorUnit = 10000;
        }
        if (edadPasajero > 4 && edadPasajero < 13) {
          valorUnit = (valorPaquete - 10000); //por confirmar
        }

        if (edadPasajero > 12) {
          valorUnit = valorPaquete;
        }

        let detalleCompra = {
          compra: compra.idCompra,
          valorUnit: valorUnit,
          pasajero: pasajeros.at(i).value.idPasajero,
          paquete: this.tourSeleccionado.paquete
        }

        detalleCompras.push(detalleCompra);
        console.log("DETALLES COMPRA:", detalleCompras);

      }

      this.detalleCompra.post(detalleCompras).subscribe(det => {
        console.log("El resultado es: ", det);
        form.submit();
      });


    })

  }


}






