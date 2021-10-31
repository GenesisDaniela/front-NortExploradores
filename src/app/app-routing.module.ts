import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesComponent } from './administracion/pages/actividades/actividades.component';
import { AliadosComponent } from './administracion/pages/aliados/aliados.component';
import { AlojamientosComponent } from './administracion/pages/alojamientos/alojamientos.component';
import { CargoComponent } from './administracion/pages/cargo/cargo.component';
import { ClientesComponent } from './administracion/pages/clientes/clientes.component';
import { EmpleadosComponent } from './administracion/pages/empleados/empleados.component';
import { InfCorporativaComponent } from './administracion/pages/inf-corporativa/inf-corporativa.component';
import { PaquetesComponent } from './administracion/pages/paquetes/paquetes.component';
import { ReportesComponent } from './administracion/pages/reportes/reportes.component';
import { ToursComponent } from './administracion/pages/tours/tours.component';
import { PrincipalComponent } from './administracion/principal/principal.component';
import { ContentComponent } from './clientes/content/content.component';
import { InicioComponent } from './clientes/pages/inicio/inicio.component';
import { VerPaquetesComponent } from './clientes/pages/ver-paquetes/ver-paquetes.component';

const routes: Routes = [
  {path:"", component:InicioComponent, 
    children:[
      {path:"inicio", component:InicioComponent},
      {path:"verPaquetes", component:VerPaquetesComponent}
  ]},

  // {path:"inicio", component:InicioComponent},
  {path:"verPaquetes", component:VerPaquetesComponent},

  {path:"administracion", component:PrincipalComponent, 
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
      {path:"tours", component:ToursComponent}
    ]},
  {path:"**", redirectTo:"/inicio"},

  // {path: 'paquetes',component: PaquetesComponent},
  // {path: 'inicio', component: InicioComponent },
  // {path: 'pagos/:idPaq',component: FormPagosComponent},
  // {path: 'pagos',component: FormPagosComponent},
  // {path: '',component: InicioComponent},
  // {path: 'misPaquetes',component: ListarPaquetesComponent},
  // {path:'reservas',component:ReservasComponent},
  // {path:'payu',component:PayuComponent},
  // {path: 'tabla', component:PruebaComponent},
  // {path:'login', component:AuthLoginComponent },
  // {path:'registro', component:RegistroComponent},
  // {path:'prueba', component:PruebaComponent},
  // {path:'infpagos', component:InformacionPagoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
