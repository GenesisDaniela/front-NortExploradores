import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { AlojamientosComponent } from './pages/alojamientos/alojamientos.component';
import { ActividadesComponent } from './pages/actividades/actividades.component';
import { AliadosComponent } from './pages/aliados/aliados.component';
import { CargoComponent } from './pages/cargo/cargo.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { InfCorporativaComponent } from './pages/inf-corporativa/inf-corporativa.component';
import { PaquetesComponent } from './pages/paquetes/paquetes.component';
import { ToursComponent } from './pages/tours/tours.component';
import { PrincipalComponent } from './principal/principal.component';

const routes : Routes = [
  {path:"", 
    component:PrincipalComponent,
    children:[
      {path:"reportes", component:ReportesComponent},
      {path:"empleados", component:EmpleadosComponent},
      {path:"alojamientos", component:AlojamientosComponent},
      {path:"actividades", component:ActividadesComponent},
      {path:"aliados", component:AliadosComponent},
      {path:"cargos", component:CargoComponent},
      {path:"clientes", component:ClientesComponent},
      {path:"infCorporativa", component:InfCorporativaComponent},
      {path:"paquetes", component:PaquetesComponent},
      {path:"reportes", component:ReportesComponent},
      {path:"tours", component:ToursComponent},
      {path:"**", redirectTo:"reportes"}
  ]}
]

@NgModule({
  
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AdministracionRoutingModule { }
