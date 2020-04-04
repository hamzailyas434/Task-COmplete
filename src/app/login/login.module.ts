import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule}   from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login-component/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
  ReactiveFormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
