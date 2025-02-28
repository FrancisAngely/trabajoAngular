import { Component, OnInit, TemplateRef, ViewChild, Renderer2 } from '@angular/core';
import { Alumnos } from '../alumnos';
import { AlumnoService } from '../alumnos.service';
import { MessageService } from '../message.service';
import { DataTablesModule } from "angular-datatables";
import { DataTablesResponse } from '../datatables-response';
import { DataTableDirective } from 'angular-datatables';
import { Config } from "datatables.net";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SweetAlert2Module, SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';
import { faTrash, faPenToSquare, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alumnos',
  standalone: false,
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css',
})
export class AlumnosComponent implements OnInit {
  alumnos: Alumnos[] = [];
  faTrash = faTrash;
  faCirclePlus = faCirclePlus;
  faPenToSquare = faPenToSquare;

delete: any;

  constructor(
    private renderer: Renderer2, private router: Router,
    private http: HttpClient, private alumnoService: AlumnoService,
    private messageService: MessageService
  ) { }

  message = '';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  dtOptions: Config = {};

  @ViewChild('confirmDialog') confirmDialog: SwalComponent | any;
  @ViewChild('swal1') respuestaDialog: SwalComponent | any;
  @ViewChild('myTable') myTable: DataTablesResponse | any;

  ngOnInit(): void {
    this.alumnoService.getAlumnos()
      .subscribe((alumnos: Alumnos[]) => this.alumnos = alumnos);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: [0, 'desc'],
      processing: true,
      language: {
        "decimal": "",
        "emptyTable": "No hay información",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
        "lengthMenu": "Mostrar _MENU_ Entradas",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
          "first": "Primero",
          "last": "Último",
          "next": "Siguiente",
          "previous": "Anterior"
        }
      },
      ajax: (dataTablesParameters: any, callback) => {
        this.http.post<DataTablesResponse>("http://localhost:8080/alumnos/datatable", dataTablesParameters, {}).subscribe((resp) => {
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: resp.data,
          });
        });
      },
      columns: [
        {
          title: "ID",
          data: "id",
        },
        {
          title: "Nombre",
          data: "nombre",
        },
        {
          title: "Apellidos",
          data: "apellidos",
        },
        {
          title: 'Eliminar',
          data: null,
          render: (data: any, type: any, row: any) => {
            return `<button class="btn btn-danger" (click)="eliminar(${row.id})">Eliminar</button>`;
          },
          className: 'action-column'
        }
      ]
    };
  }

  async eliminar(alumnoId: number) {
    const resp = await this.confirmDialog.fire();
    if (resp.isConfirmed) {
      this.alumnoService.deleteAlumno(alumnoId).subscribe();
      await this.respuestaDialog.fire();
      this.alumnos = this.alumnos.filter(a => a.id !== alumnoId);
    }
  }

  onClickSubmit(alumnoData: any) {
    console.log('Form data:', alumnoData);
  }
}