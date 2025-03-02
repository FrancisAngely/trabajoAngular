import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Notas } from '../notas';
import { NotaService } from '../notas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-nota-new',
  standalone: false,

  templateUrl: './notas-new.component.html',
  styleUrls: ['./notas-new.component.css'],
})
export class NotaNewComponent implements OnInit {
  nota: Notas | undefined;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private notaService: NotaService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      id_alumnos: ['', Validators.required],
      id_modulos: ['', Validators.required],
      nota: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
    });
  }

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }

  submit(): void {
    if (this.form.valid) {
      this.notaService.addNotas(this.form.value).subscribe(() => {
        this.location.back();
      });
    } else {
      alert('Formulario no valido');
    }
  }

  get id_alumnos() {
    return this.form.get('id_alumnos');
  }
  get id_modulos() {
    return this.form.get('id_modulos');
  }
  get notaField() {
    return this.form.get('nota');
  }
}
