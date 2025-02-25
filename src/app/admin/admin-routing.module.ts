import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from '../dashboard/dashboard.component';
;
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { UsuarioDetailComponent } from '../usuario-detail/usuario-detail.component';
import { RolesComponent } from '../roles/roles.component';
import { UsuarioNewComponent } from '../usuario-new/usuario-new.component';
import { AuthGuard } from '../guards/auth.guard';

import { RoleNewComponent } from '../role-new/role-new.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' , canActivate: [AuthGuard],canMatch: [AuthGuard]},
  { path: 'sigin', redirectTo: '/login', pathMatch: 'full' },
 
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard],canMatch: [AuthGuard] },
  { path: 'usuarios/detail/:id', component: UsuarioDetailComponent, canActivate: [AuthGuard],canMatch: [AuthGuard] },
  { path: 'usuarios/new', component: UsuarioNewComponent, canActivate: [AuthGuard],canMatch: [AuthGuard] },
  { path: 'roles', component: RolesComponent, canActivate: [AuthGuard],canMatch: [AuthGuard] },
  { path: 'roles/new', component: RoleNewComponent, canActivate: [AuthGuard],canMatch: [AuthGuard] },
  
]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
