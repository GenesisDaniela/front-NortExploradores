import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//COMPONENTES DE ANGULAR
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AdministracionModule } from './administracion/administracion.module';
import { RouterModule } from '@angular/router';
import { ErrorPagesComponent } from './shared/error-pages/error-pages.component';
import { ClientesModule } from './clientes/clientes.module';

//DATA-TABLES
import { DataTablesModule } from "angular-datatables";

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    ErrorPagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    NzButtonModule,
    AdministracionModule,
    ClientesModule,
    DataTablesModule
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }],
  bootstrap: [AppComponent]
})
export class AppModule { }
