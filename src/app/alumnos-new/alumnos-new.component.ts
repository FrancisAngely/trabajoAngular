import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Alumnos } from '../alumnos'; // Cambio de Notas a Alumno
import { AlumnoService } from '../alumnos.service'; // Cambio de NotaService a AlumnoService
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-alumno-new', // Cambio en el selector
  standalone: false,
  templateUrl: './alumnos-new.component.html', // Cambio en la plantilla
  styleUrls: ['./alumnos-new.component.css'], // Cambio en el archivo de estilos
})
export class AlumnoNewComponent implements OnInit {
  // Cambio en el nombre de la clase
  alumno: Alumnos | undefined; // Cambio de nota a alumno
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private AlumnoService: AlumnoService, // Cambio de notaService a alumnoService
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      nombre: ['', Validators.required], // Cambio de id_alumnos a nombre
      apellidos: ['', Validators.required], // Cambio de id_modulos a apellido
    });
  }

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }

  submit(): void {
    if (this.form.valid) {
      this.AlumnoService.addAlumno(this.form.value).subscribe(() => {
        this.location.back();
      });
    } else {
      alert('Formulario no válido');
    }
  }

  get nombre() {
    return this.form.get('nombre');
  }
  get apellidos() {
    return this.form.get('apellidos');
  }
}
