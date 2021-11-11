import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//DATA-TABLES
import { DataTablesModule } from "angular-datatables";

// COMPONENTES ANGULAR ZORRO
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalModule } from 'ng-zorro-antd/modal';

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
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { AddAlojamientoComponent } from './pages/alojamientos/add-alojamiento/add-alojamiento.component';
import { AddSegurosComponent } from './pages/aliados/add-seguros/add-seguros.component';
import { AddTransportesComponent } from './pages/aliados/add-transportes/add-transportes.component';
import { UpdateEmpleadoComponent } from './pages/empleados/update-empleado/update-empleado.component';
import { TransportesComponent } from './pages/aliados/transportes/transportes.component';
import { SegurosComponent } from './pages/aliados/seguros/seguros.component';

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
    AddTourComponent,
    CalendarioComponent,
    AddAlojamientoComponent,
    AddSegurosComponent,
    AddTransportesComponent,
    UpdateEmpleadoComponent,
    TransportesComponent,
    SegurosComponent
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
    NzDropDownModule,
    NzStepsModule,
    NzCalendarModule,
    NzBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    NzModalModule
  ],
  exports:[
    PrincipalComponent
  ]
})
export class AdministracionModule { }
