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
import { AddEmpleadoComponent } from './pages/empleados/add-empleado/add-empleado.component';
import { AddCargoComponent } from './pages/cargo/add-cargo/add-cargo.component';
import { AddActividadComponent } from './pages/actividades/add-actividad/add-actividad.component';
import { AddTourComponent } from './pages/tours/add-tour/add-tour.component';
import { AddPaqueteComponent } from './pages/paquetes/add-paquete/add-paquete.component';
import { AddAliadoComponent } from './pages/aliados/add-aliado/add-aliado.component';
import { AddAlojamientoComponent } from './pages/alojamientos/add-alojamiento/add-alojamiento.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { AddSegurosComponent } from './pages/aliados/add-seguros/add-seguros.component';
import { AddTransportesComponent } from './pages/aliados/add-transportes/add-transportes.component';
import { UpdateEmpleadoComponent } from './pages/empleados/update-empleado/update-empleado.component';
import { TransportesComponent } from './pages/aliados/transportes/transportes.component';
import { SegurosComponent } from './pages/aliados/seguros/seguros.component';

const routes : Routes = [
  {path:"", 
    component:PrincipalComponent,
    children:[
      {path:"infoCorporativa", component:InfCorporativaComponent},
      {path:"reportes", component:ReportesComponent},
      {path:"empleados", component:EmpleadosComponent},
        {path:"nuevoEmpleado", component:AddEmpleadoComponent},
        {path:"update/:id", component:UpdateEmpleadoComponent},
      {path:"alojamientos", component:AlojamientosComponent},
        {path:"nuevoAlojamiento", component:AddAlojamientoComponent},
        {path:"editarAlojamiento/:idAlojamiento", component:AddAlojamientoComponent},
        
      {path:"actividades", component:ActividadesComponent},
        {path:"nuevaActividad", component:AddActividadComponent},
        {path:"editarActividad/:idActividad", component:AddActividadComponent},


      {path:"aliados", component:AliadosComponent},
        {path:"nuevoAliado", component:AddAliadoComponent},
        {path:"nuevoSeguro", component:AddSegurosComponent},
        {path:"nuevoTransporte", component:AddTransportesComponent},
        {path:"editarAliado/:idAliado", component:AddAliadoComponent},
        {path:"transportes", component:TransportesComponent},
        {path:"seguros", component:SegurosComponent},
        {path:"editarSeguro/:idSeguro", component:AddSegurosComponent},
     
        {path:"cargos", component:CargoComponent},
        {path:"nuevoCargo", component:AddCargoComponent},
        {path:"editarCargo/:idCargo", component:AddCargoComponent},

      {path:"clientes", component:ClientesComponent},
      {path:"infCorporativa", component:InfCorporativaComponent},
      {path:"paquetes", component:PaquetesComponent},
        {path:"nuevoPaquete", component:AddPaqueteComponent},
      {path:"reportes", component:ReportesComponent},
      {path:"tours", component:ToursComponent},
        {path:"nuevoTour", component:AddTourComponent},
      {path:"calendario", component:CalendarioComponent},
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
