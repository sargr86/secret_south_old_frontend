import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminLoginRoutingModule} from './admin-login-routing.module';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import
{
  MatInputModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AdminLoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AdminLoginModule {
}
