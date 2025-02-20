import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from '../login/login.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes,Router } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
   
  ]
})
export class AuthModule { }
