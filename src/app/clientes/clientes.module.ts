import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { VerRutasComponent } from './pages/ver-rutas/ver-rutas.component';
<<<<<<< HEAD

import { PasadiaComponent } from './pages/tours/pasadia/pasadia.component';
import { EstadiaComponent } from './pages/tours/estadia/estadia.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
// import { CalendarioComponent } from '../administracion/pages/calendario/calendario.component';
=======
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { PasadiaComponent } from './pages/tours/pasadia/pasadia.component';
import { EstadiaComponent } from './pages/tours/estadia/estadia.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { FormPagosComponent } from './pages/pagos/form-pagos/form-pagos.component';
import { InformacionPagoComponent } from './pages/pagos/informacion-pago/informacion-pago/informacion-pago.component';
>>>>>>> fa3a36a313f5340b951c7c5ab935e488477911df

//NG ZORRO
import { NzCarouselModule } from 'ng-zorro-antd/carousel';


@NgModule({
  declarations: [
    InicioComponent,
    HomeComponent,
    VerRutasComponent,
    PasadiaComponent,
    EstadiaComponent,
    ContactoComponent,
<<<<<<< HEAD
=======
    FormPagosComponent,
    InformacionPagoComponent
>>>>>>> fa3a36a313f5340b951c7c5ab935e488477911df
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule,
    NzCarouselModule,
<<<<<<< HEAD

=======
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
>>>>>>> fa3a36a313f5340b951c7c5ab935e488477911df
  ],
  exports:[]
})
export class ClientesModule { }
