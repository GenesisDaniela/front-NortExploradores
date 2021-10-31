import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { RouterModule } from '@angular/router';

// COMPONENTES ANGULAR
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { AlojamientosComponent } from './pages/alojamientos/alojamientos.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { InfCorporativaComponent } from './pages/inf-corporativa/inf-corporativa.component';
import { CargoComponent } from './pages/cargo/cargo.component';
import { ToursComponent } from './pages/tours/tours.component';
import { PaquetesComponent } from './pages/paquetes/paquetes.component';
import { AliadosComponent } from './pages/aliados/aliados.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ActividadesComponent } from './pages/actividades/actividades.component';
import { AdministracionRoutingModule } from './administracion-routing.module';

@NgModule({
  declarations: [
    PrincipalComponent,
    EmpleadosComponent,
    AlojamientosComponent,
    ReportesComponent,
    InfCorporativaComponent,
    CargoComponent,
    ToursComponent,
    PaquetesComponent,
    AliadosComponent,
    ClientesComponent,
    ActividadesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzIconModule,
    NzPageHeaderModule,
    NzMenuModule,
    AdministracionRoutingModule
  ],
  exports:[
    PrincipalComponent
  ]
})
export class AdministracionModule { }
