import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { RouterModule } from '@angular/router';

//DATA-TABLES
import { DataTablesModule } from "angular-datatables";

// COMPONENTES ANGULAR ZORRO
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

// COMPONENTES 
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
import { AddEmpleadoComponent } from './pages/empleados/add-empleado/add-empleado.component';
import { AddCargoComponent } from './pages/cargo/add-cargo/add-cargo.component';
import { AddPaqueteComponent } from './pages/paquetes/add-paquete/add-paquete.component';
import { AddAliadoComponent } from './pages/aliados/add-aliado/add-aliado.component';
import { AddActividadComponent } from './pages/actividades/add-actividad/add-actividad.component';
import { AddTourComponent } from './pages/tours/add-tour/add-tour.component';

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
    ActividadesComponent,
    AddEmpleadoComponent,
    AddCargoComponent,
    AddPaqueteComponent,
    AddAliadoComponent,
    AddActividadComponent,
    AddTourComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzIconModule,
    NzPageHeaderModule,
    NzMenuModule,
    DataTablesModule,
    AdministracionRoutingModule,
    NzButtonModule,
    NzDropDownModule
  ],
  exports:[
    PrincipalComponent
  ]
})
export class AdministracionModule { }
