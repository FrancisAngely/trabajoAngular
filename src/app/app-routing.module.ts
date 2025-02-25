import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioDetailComponent } from './usuario-detail/usuario-detail.component';
import { RolesComponent } from './roles/roles.component';

import { LoginComponent } from './login/login.component';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/noauth.guard';

export const routes: Routes = [
  {path:'admin',loadChildren:() => import('./admin/admin.module').then(m=>m.AdminModule), canActivate: [AuthGuard]},
  {path:'',loadChildren:() => import('./auth/auth.module').then(m=>m.AuthModule), canActivate: [NoAuthGuard]},
  {path:'auth',loadChildren:() => import('./auth/auth.module').then(m=>m.AuthModule)},
  {path:'admin',loadChildren:() => import('./admin/admin.module').then(m=>m.AdminModule), canActivate: [AuthGuard],canMatch: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],//, { useHash: true }
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
