import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor, UpperCasePipe } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RolesComponent } from './roles/roles.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgTemplateRefComponent } from './ng-template-ref/ng-template-ref.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SharedModule } from './shared/shared.module';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './login/login.component';
//import { Select2Module } from 'ng-select2-component'; // Cambiado a Select2Module
import { Select2,Select2Hint,Select2Label } from 'ng-select2-component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { UsuarioNewComponent } from './usuario-new/usuario-new.component';
import { RoleNewComponent } from './role-new/role-new.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router'; // Importar RouterModule para routerLink
import { UsuarioDetailComponent } from './usuario-detail/usuario-detail.component';
import { Component } from '@angular/core';

import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';  // Add this import

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    DashboardComponent,
    UsuariosComponent,
    RolesComponent,
    NgTemplateRefComponent,
    LoginComponent,
    UsuarioNewComponent,
    RoleNewComponent,
    UsuarioDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    DataTablesModule,
    NgbModule,
    NgxDatatableModule,
    SweetAlert2Module.forRoot(),
    SharedModule,
    FontAwesomeModule,
    Select2,
    Select2Hint,Select2Label,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule, 
    FontAwesomeModule,
    
  ],
  providers: [
    CookieService,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }