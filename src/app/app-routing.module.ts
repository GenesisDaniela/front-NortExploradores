import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPagosComponent } from './reserva/pages/pagos/form-pagos/form-pagos.component';
import { ErrorPagesComponent } from './shared/error-pages/error-pages.component';

const routes: Routes = [
  {
    path:"pago",component:FormPagosComponent
  },
  {
    path:"pago/:idPaq",component:FormPagosComponent
  },
  {
    path:"administracion",
    loadChildren: ()=> import("./administracion/administracion.module").then( m => m.AdministracionModule)
  },
  {
    path:"",
    loadChildren: ()=> import("./reserva/clientes.module").then(m => m.ClientesModule)
  },
  {path:"404", component:ErrorPagesComponent},
  {path:"**", redirectTo:""},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
