import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from '../heroes/heroes.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { UsuarioDetailComponent } from '../usuario-detail/usuario-detail.component';
import { RolesComponent } from '../roles/roles.component';
import { LocalidadesComponent } from '../localidades/localidades.component';
import { ClientesComponent } from '../clientes/clientes.component';
import { ClienteDetailComponent } from '../cliente-detail/cliente-detail.component';
import { ContactosComponent } from '../contactos/contactos.component';
import { ContactoDetailComponent } from '../contacto-detail/contacto-detail.component';
import { AuthGuard } from '../guards/auth.guard';
import { LocalidadDetailComponent } from '../localidad-detail/localidad-detail.component';
import { ComerciosComponent } from '../comercios/comercios.component';
import { ComercioDetailComponent } from '../comercio-detail/comercio-detail.component';
import { ComercioNewComponent } from '../comercio-new/comercio-new.component';
import { UsuarioNewComponent } from '../usuario-new/usuario-new.component';
import { HeroNewComponent } from '../hero-new/hero-new.component';
import { RoleNewComponent } from '../role-new/role-new.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' , canActivate: [AuthGuard],canMatch: [AuthGuard]},
  { path: 'sigin', redirectTo: '/login', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent , canActivate: [AuthGuard],canMatch: [AuthGuard]},
  { path: 'heroes/new', component: HeroNewComponent, canActivate: [AuthGuard],canMatch: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard],canMatch: [AuthGuard] },
  { path: 'usuarios/detail/:id', component: UsuarioDetailComponent, canActivate: [AuthGuard],canMatch: [AuthGuard] },
  { path: 'usuarios/new', component: UsuarioNewComponent, canActivate: [AuthGuard],canMatch: [AuthGuard] },
  { path: 'roles', component: RolesComponent, canActivate: [AuthGuard],canMatch: [AuthGuard] },
  { path: 'roles/new', component: RoleNewComponent, canActivate: [AuthGuard],canMatch: [AuthGuard] },
  { path: 'localidades', component: LocalidadesComponent, canActivate: [AuthGuard],canMatch: [AuthGuard] },
  { path: 'localidades/detail/:id', component: LocalidadDetailComponent, canActivate: [AuthGuard],canMatch: [AuthGuard] },
  { path: 'clientes', component: ClientesComponent , canActivate: [AuthGuard],canMatch: [AuthGuard]},
  { path: 'clientes/detail/:id', component: ClienteDetailComponent , canActivate: [AuthGuard],canMatch: [AuthGuard]},
  { path: 'contactos', component: ContactosComponent , canActivate: [AuthGuard],canMatch: [AuthGuard]},
  { path: 'contactos/detail/:id', component: ContactoDetailComponent, canActivate: [AuthGuard],canMatch: [AuthGuard] },
  { path: 'comercios', component: ComerciosComponent , canActivate: [AuthGuard],canMatch: [AuthGuard]},
  { path: 'comercios/detail/:id', component: ComercioDetailComponent, canActivate: [AuthGuard],canMatch: [AuthGuard] },
  { path: 'comercios/new', component: ComercioNewComponent, canActivate: [AuthGuard],canMatch: [AuthGuard] },
]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
