import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './clientes/pages/inicio/inicio.component';
import { ErrorPagesComponent } from './shared/error-pages/error-pages.component';

const routes: Routes = [

  {
    path:"administracion", 
    loadChildren: ()=> import("./administracion/administracion.module").then( m => m.AdministracionModule)
  },
  {
    path:"",
    loadChildren: ()=> import("./clientes/clientes.module").then( m => m.ClientesModule)
  },
  {path:"404", component:ErrorPagesComponent},  
  {path:"**", redirectTo:""},
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
