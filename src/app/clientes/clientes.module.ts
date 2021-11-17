import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { VerRutasComponent } from './pages/ver-rutas/ver-rutas.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PasadiaComponent } from './pages/tours/pasadia/pasadia.component';
import { EstadiaComponent } from './pages/tours/estadia/estadia.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { FormPagosComponent } from './pages/pagos/form-pagos/form-pagos.component';
import { InformacionPagoComponent } from './pages/pagos/informacion-pago/informacion-pago/informacion-pago.component';

//NG ZORRO
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { QuienesSomosComponent } from './pages/inicio/quienes-somos/quienes-somos.component';
import { ServiciosComponent } from './pages/inicio/servicios/servicios.component';
import { ExperienciasComponent } from './pages/inicio/experiencias/experiencias.component';
import { ViajesGrupalesComponent } from './pages/viajes-grupales/viajes-grupales.component';
import { FestividadesComponent } from './pages/festividades/festividades.component';
import { RecomendacionesComponent } from './pages/recomendaciones/recomendaciones.component';
import { NuestrosAliadosComponent } from './pages/inicio/nuestros-aliados/nuestros-aliados.component';
import { ToursDelMesComponent } from './pages/inicio/tours-del-mes/tours-del-mes.component';
import { DesRutasComponent } from './pages/des-rutas/des-rutas.component';
import { DetalleTourComponent } from './pages/tours/detalle-tour/detalle-tour.component';
import { AddExperienciaComponent } from './pages/inicio/experiencias/add-experiencia/add-experiencia.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MaletaComponent } from './pages/maleta/maleta.component';

@NgModule({
  declarations: [
    InicioComponent,
    HomeComponent,
    VerRutasComponent,
    PasadiaComponent,
    EstadiaComponent,
    ContactoComponent,
    FormPagosComponent,
    InformacionPagoComponent,
    QuienesSomosComponent,
    ServiciosComponent,
    ExperienciasComponent,
    ViajesGrupalesComponent,
    FestividadesComponent,
    RecomendacionesComponent,
    NuestrosAliadosComponent,
    ToursDelMesComponent,
    DesRutasComponent,
    DetalleTourComponent,
    AddExperienciaComponent,
    MaletaComponent,
    InformacionPagoComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule,
    NzCarouselModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NzButtonModule
  ],
  exports:[]
})
export class ClientesModule { }
