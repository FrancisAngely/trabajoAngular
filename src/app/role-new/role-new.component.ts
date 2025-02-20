import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Role } from '../role';
import { RoleService } from '../role.service';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from "@angular/forms";
@Component({
  selector: 'app-role-new',
  standalone: false,
  
  templateUrl: './role-new.component.html',
  styleUrl: './role-new.component.css'
})
export class RoleNewComponent {
//role: Role | undefined;
form:FormGroup;

constructor(
  private route: ActivatedRoute,
  private roleService: RoleService,
  private location: Location,
  private formBuilder: FormBuilder
) {this.form = formBuilder.group({
  role: ['', Validators.required]
});}

ngOnInit() {
}
goBack(): void {
  this.location.back();
}



     submit() {
      console.log(this.form);
      if (this.form.valid) {
        
       
        this.roleService.addRole(this.form.value)
          .subscribe(c => {
            this.location.back();
          });
      }
      else{
        alert("FILL ALL FIELDS")
      }
    }

    
    get role() {
      return this.form.get('role'); // Getter para facilitar el acceso en el HTML
    }
   
}
