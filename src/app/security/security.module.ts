import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';



@NgModule({
  declarations: [
    AuthRegisterComponent,
    AuthLoginComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SecurityModule { }
