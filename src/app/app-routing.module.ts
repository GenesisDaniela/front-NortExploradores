import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPagosComponent } from './clientes/pages/pagos/form-pagos/form-pagos.component';
import { ErrorPagesComponent } from './shared/error-pages/error-pages.component';

const routes: Routes = [
  {
    path:"pago",component:FormPagosComponent
  },
  {
    path:"pago/:idPago",component:FormPagosComponent
  },
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
