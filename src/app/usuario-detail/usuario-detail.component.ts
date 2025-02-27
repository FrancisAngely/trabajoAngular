import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UsuarioService } from '../usuario.service';
import { RoleService } from '../role.service';
import { Usuario } from '../usuario';
import { Role } from '../role';
import { Select2 } from 'ng-select2-component';
import { Router  } from '@angular/router';
@Component({
  standalone:false,
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css']
})
export class UsuarioDetailComponent implements OnInit {
  dataRoles: any; // Aquí almacenamos los roles mapeados para select2
  usuario: Usuario | any;
  roles: Role[] = [];

  constructor(
    private router: ActivatedRoute ,
    private usuarioService: UsuarioService,
    private location: Location,
    private roleService: RoleService,
  ) {}

  ngOnInit(): void {
    // Obtener los roles y formatearlos para select2
    this.roleService.getRoles().subscribe((roles: any[]) => {
      this.dataRoles = roles.map((role: any) => ({
        value: role.id,
        label: role.role
      }));
    });

    // Obtener el usuario desde la URL
    this.getUsuario();

    // También cargar los roles (aunque este paso es redundante si ya lo haces en el método anterior)
    this.roleService.getRoles()
      .subscribe((roles: Role[]) => this.roles = roles);
  }

  getUsuario(): void {
    const id = Number(this.router.snapshot.paramMap.get('id'));
    this.usuarioService.getUsuario(id)
      .subscribe((usuario: any) => this.usuario = usuario);
  }

  goBack(): void {
    this.location.back();
  }

  onClickSubmit(data: any): void {
    let usuario = this.usuario;
    
    // Si el usuario existe, actualizarlo
    if (usuario) {
      this.usuarioService.updateUsuario(usuario)
        .subscribe(() => this.goBack());
    }
  }
}

