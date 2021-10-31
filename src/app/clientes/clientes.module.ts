import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { VerPaquetesComponent } from './pages/ver-paquetes/ver-paquetes.component';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ContentComponent } from './content/content.component';



@NgModule({
  declarations: [
    VerPaquetesComponent,
    InicioComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    VerPaquetesComponent,
    InicioComponent
  ]
})
export class ClientesModule { }
