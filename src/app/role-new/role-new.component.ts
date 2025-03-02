import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Role } from '../role';
import { RoleService } from '../role.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-role-new',
  standalone: false,
  templateUrl: './role-new.component.html',
  styleUrl: './role-new.component.css',
})
export class RoleNewComponent implements OnInit {
  role: Role | undefined;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private roleService: RoleService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      role: ['', Validators.required],
    });
  }

  ngOnInit() {}

  goBack(): void {
    this.location.back();
  }

  submit() {
    console.log(this.form);
    if (this.form.valid) {
      this.roleService.addRole(this.form.value).subscribe(() => {
        this.location.back();
      });
    } else {
      alert('Formulario no valido');
    }
  }

  get roleName() {
    return this.form.get('role'); // Getter para acceder al campo role en el HTML
  }
}
