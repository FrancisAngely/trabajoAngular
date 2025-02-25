import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {FormsModule} from '@angular/forms';

import {Usuario} from '../usuario';
import { UsuarioService } from '../usuario.service';

import { Role } from '../role';
import { RoleService } from '../role.service';




import { Select2 } from 'ng-select2-component';




@Component({
  selector: 'app-usuario-detail',
  standalone: false,
  
  templateUrl: './usuario-detail.component.html',
  styleUrl: './usuario-detail.component.css'
})
export class UsuarioDetailComponent {
  dataRoles: any;
  dataComercios: any;
  //@Input() usuario?: Usuario;
  
  usuario: Usuario | any;
  roles: Role[] = [];

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private location: Location,
    private roleService: RoleService,
    
  ) {}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe((roles) => {
      this.dataRoles = roles.map((role: any) => ({
        value: role.id,
        label: role.role
      }));
    })
    
   

    this.getUsuario();
    this.roleService.getRoles()
    .subscribe(roles => this.roles = roles);
  }

  getUsuario(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioService.getUsuario(id)
      .subscribe(usuario => this.usuario = usuario);
  }

  goBack(): void {
    this.location.back();
  }
  /*save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }*/

    onClickSubmit(data:any) {
      //alert(this.usuario?.apellido);
        let usuario = {} as Usuario|undefined;
        usuario=this.usuario;
       
       if(usuario)
          this.usuarioService.updateUsuario(usuario)
          .subscribe(()=> this.goBack());
          };
     

}
