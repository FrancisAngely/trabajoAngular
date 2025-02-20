import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-usuario-new',
  standalone: false,
  
  templateUrl: './usuario-new.component.html',
  styleUrl: './usuario-new.component.css'
})
export class UsuarioNewComponent implements OnInit{

usuario: Usuario | undefined;
form:FormGroup;

constructor(
  private route: ActivatedRoute,
  private usuarioService: UsuarioService,
  private location: Location,
  private formBuilder: FormBuilder
) {this.form = formBuilder.group({
  email: ['', [Validators.required,Validators.email]]
  ,password: ['', Validators.required]
  ,nombre: ['', Validators.required]
  ,apellido: ['']
  ,id_roles: ['', Validators.required]
  ,id_comercios: ['', Validators.required]
  
});}

ngOnInit() {
}
goBack(): void {
  this.location.back();
}



     submit() {
      console.log(this.form);
      if (this.form.valid) {
        
       
        this.usuarioService.addUsuario(this.form.value)
          .subscribe(c => {
            this.location.back();
          });
      }
      else{
        alert("FILL ALL FIELDS")
      }
    }

    get id_comercios() {
      return this.form.get('id_comercios'); // Getter para facilitar el acceso en el HTML
    }

    get id_roles() {
      return this.form.get('id_roles'); // Getter para facilitar el acceso en el HTML
    }
    get nombre() {
      return this.form.get('nombre'); // Getter para facilitar el acceso en el HTML
    }
    get password() {
      return this.form.get('password'); // Getter para facilitar el acceso en el HTML
    }
    get email() {
      return this.form.get('email'); // Getter para facilitar el acceso en el HTML
    }
}
