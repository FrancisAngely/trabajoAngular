import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Modulo } from '../modulos'; // Aquí usamos el modelo de Modulo
import { ModuloService } from '../modulos.service'; // Servicio actualizado a ModuloService
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modulo-new',
  standalone: false,
  templateUrl: './modulos-new.component.html',
  styleUrls: ['./modulos-new.component.css'],
})
export class ModuloNewComponent implements OnInit {
  modulo: Modulo | undefined;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private ModuloService: ModuloService, // Cambié "notaService" por "moduloService"
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      modulo: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }

  submit(): void {
    if (this.form.valid) {
      this.ModuloService.addModulo(this.form.value).subscribe(() => {
        this.location.back();
      });
    } else {
      alert('Formulario no valido');
    }
  }

  get moduloss() {
    return this.form.get('modulo');
  }
}
