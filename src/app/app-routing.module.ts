import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudComponent } from './administracion/pages/solicitud/solicitud.component';
import { InicioComponent } from './clientes/pages/inicio/inicio.component';
import { FormPagosComponent } from './clientes/pages/pagos/form-pagos/form-pagos.component';
import { InformacionPagoComponent } from './clientes/pages/pagos/informacion-pago/informacion-pago/informacion-pago.component';
import { AuthLoginComponent } from './security/auth-login/auth-login.component';
import { AuthRegisterComponent } from './security/auth-register/auth-register.component';
import { LoginUsuario } from './security/models/login-usuario';
import { ErrorPagesComponent } from './shared/error-pages/error-pages.component';

const routes: Routes = [
  // {
  //   path:"login",component:AuthLoginComponent
  // },
  // {
  //   path:"registro",component:AuthRegisterComponent
  // },
  {
    path:"infpago/:idTransaccion",component:InformacionPagoComponent
  },
  {
    path:"infpago",component:InformacionPagoComponent
  },
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
