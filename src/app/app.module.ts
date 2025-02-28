import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioNewComponent } from './usuario-new/usuario-new.component';
import { RoleNewComponent } from './role-new/role-new.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { UsuarioDetailComponent } from './usuario-detail/usuario-detail.component';
import { NotasComponent } from './notas/notas.component';
import { AlumnosComponent } from './alumnos/alumnos.component';


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
    UsuarioDetailComponent,
    NotasComponent, 
    AlumnosComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule,
    NgxDatatableModule,
    SweetAlert2Module.forRoot(),
    SharedModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }