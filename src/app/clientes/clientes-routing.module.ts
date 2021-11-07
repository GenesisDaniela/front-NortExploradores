import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { HomeComponent } from './pages/home/home.component';
import { VerRutasComponent } from './pages/ver-rutas/ver-rutas.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PasadiaComponent } from './pages/tours/pasadia/pasadia.component';
import { EstadiaComponent } from './pages/tours/estadia/estadia.component';
import { RecomendacionesComponent } from './pages/recomendaciones/recomendaciones.component';
import { ViajesGrupalesComponent } from './pages/viajes-grupales/viajes-grupales.component';
import { FestividadesComponent } from './pages/festividades/festividades.component';

const routes : Routes = [
  {path:"",
    component:HomeComponent, 
    children:[
    {path:"inicio", component:InicioComponent},
    {path:"rutas", component:VerRutasComponent},
    {path:"contacto", component:ContactoComponent},
    {path:"pasadia", component:PasadiaComponent},
    {path:"estadia", component:EstadiaComponent},
    {path:"recomendaciones", component:RecomendacionesComponent},
    {path:"viajesGrupales", component:ViajesGrupalesComponent},
    {path:"festividades", component:FestividadesComponent},
    {path:"**", redirectTo:"inicio"}
  ]}
]

@NgModule({
  
  imports: [
    RouterModule.forChild( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class ClientesRoutingModule { }
