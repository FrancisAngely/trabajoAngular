import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RolesComponent } from './roles/roles.component';
import { LoginComponent } from './login/login.component';
import { UsuarioNewComponent } from './usuario-new/usuario-new.component';
import { RoleNewComponent } from './role-new/role-new.component';
import { UsuarioDetailComponent } from './usuario-detail/usuario-detail.component';
import { NotasComponent } from './notas/notas.component';
import { AlumnosComponent } from './alumnos/alumnos.component'; // Asegúrate de que AlumnosComponent esté correctamente importado
// import { AlumnosDetailComponent } from './alumnos/alumnos-detail.component'; // Asegúrate de que el componente de detalle esté importado
// import { AlumnosNewComponent } from './alumnos/alumnos-new.component'; // Asegúrate de que el componente de nuevo alumno esté importado

import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/noauth.guard';

export const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [NoAuthGuard] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  
  // Eliminamos la ruta duplicada 'admin'
  // { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard], canMatch: [AuthGuard] },

  // Rutas de alumnos
  { path: 'alumnos', component: AlumnosComponent, canActivate: [AuthGuard] }, // Lista de alumnos
  // { path: 'alumnos/detail/:id', component: AlumnosDetailComponent, canActivate: [AuthGuard] }, // Detalle de un alumno
  // { path: 'alumnos/new', component: AlumnosNewComponent, canActivate: [AuthGuard] }, // Formulario para agregar un nuevo alumno
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // Si no necesitas el hash en las rutas, puedes eliminar `{ useHash: true }`
  exports: [RouterModule]
})
export class AppRoutingModule { }
