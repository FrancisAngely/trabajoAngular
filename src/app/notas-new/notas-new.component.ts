import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Notas } from '../notas'; // Asegúrate de que la clase 'Notas' esté bien definida
import { NotaService } from '../notas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-nota-new', // Nombre del selector para el componente
  standalone: false, // Si tu componente es independiente, esta propiedad puede ser útil

  templateUrl: './notas-new.component.html', // Ruta del archivo de plantilla
  styleUrls: ['./notas-new.component.css'], // Asegúrate de que styleUrls esté correctamente configurado
})
export class NotaNewComponent implements OnInit {
  nota: Notas | undefined; // Modelo de nota
  form: FormGroup; // Grupo de formulario

  constructor(
    private route: ActivatedRoute,
    private notaService: NotaService, // Servicio para interactuar con las notas
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    // Inicialización del formulario con validaciones
    this.form = formBuilder.group({
      id_alumnos: ['', Validators.required], // Validación de id_alumnos
      id_modulos: ['', Validators.required], // Validación de id_modulos
      nota: [
        '',
        [Validators.required, Validators.min(0), Validators.max(10)], // Validación de nota entre 0 y 10
      ],
    });
  }

  ngOnInit(): void {}

  // Función para regresar a la página anterior
  goBack(): void {
    this.location.back();
  }

  // Función para enviar el formulario
  submit(): void {
    console.log(this.form);
    if (this.form.valid) {
      // Si el formulario es válido, llamar al servicio para agregar la nota
      this.notaService.addNotas(this.form.value).subscribe(() => {
        this.location.back(); // Regresar a la página anterior después de agregar la nota
      });
    } else {
      alert('FILL ALL FIELDS'); // Si el formulario no es válido, mostrar alerta
    }
  }

  // Getters para los campos del formulario
  get id_alumnos() {
    return this.form.get('id_alumnos'); // Getter para id_alumnos
  }
  get id_modulos() {
    return this.form.get('id_modulos'); // Getter para id_modulos
  }
  get notaField() {
    return this.form.get('nota'); // Getter para el campo de nota
  }
}
