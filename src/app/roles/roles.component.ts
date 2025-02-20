import { Component,OnInit } from '@angular/core';
import { Role } from '../role';
import {FormsModule} from '@angular/forms';

import { RoleService } from '../role.service';
import { MessageService } from '../message.service';
import { faCoffee, faStar as faStarSolid,faDownload,faTrash,faCirclePlus  } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-roles',
  standalone: false,
  
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{
  faCirclePlus=faCirclePlus;
 roles: Role[] = [];
   constructor(private roleService: RoleService, private messageService: MessageService) { }
 
   getRoles(): void {
     this.roleService.getRoles()
       .subscribe(roles => this.roles = roles);
         
   }
 
   
   ngOnInit(): void {
     this.getRoles();
   }
}
