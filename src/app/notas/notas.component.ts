import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { Notas } from '../notas';
import { NotaService } from '../notas.service';
import { MessageService } from '../message.service';
import { DataTablesModule } from 'angular-datatables';
import { DataTablesResponse } from '../datatables-response';
import { DataTableDirective } from 'angular-datatables';
import { Config } from 'datatables.net';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SweetAlert2Module, SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';
import {
  faTrash,
  faPenToSquare,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notas',
  standalone: false,
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css',
})
export class NotasComponent implements OnInit {
  notas: Notas[] = [];
  faTrash = faTrash;
  faCirclePlus = faCirclePlus;
  faPenToSquare = faPenToSquare;
  icono =
    `<fa-icon class="ng-fa-icon" size="xs">
  <svg 
    aria-hidden="true" data-prefix="` +
    this.faTrash.prefix +
    `" data-icon="` +
    this.faTrash.iconName +
    `"
    class="svg-inline--fa fa-` +
    this.faTrash.iconName +
    `" role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 ` +
    this.faTrash.icon[0] +
    ` ` +
    this.faTrash.icon[1] +
    `">
    <path fill="currentColor" d="` +
    this.faTrash.icon[4] +
    `"></path></svg></fa-icon>
  `;
  iconoEdit =
    `<fa-icon class="ng-fa-icon" size="xs">
  <svg 
    aria-hidden="true" data-prefix="` +
    this.faPenToSquare.prefix +
    `" data-icon="` +
    this.faPenToSquare.iconName +
    `"
    class="svg-inline--fa fa-` +
    this.faPenToSquare.iconName +
    `" role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 ` +
    this.faPenToSquare.icon[0] +
    ` ` +
    this.faPenToSquare.icon[1] +
    `">
    <path fill="currentColor" d="` +
    this.faPenToSquare.icon[4] +
    `"></path></svg></fa-icon>
  `;
  delete: any;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private http: HttpClient,
    private notaService: NotaService,
    private messageService: MessageService
  ) {}

  message = '';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  dtOptions: Config = {};

  @ViewChild('confirmDialog') confirmDialog: SwalComponent | any;
  @ViewChild('swal1') respuestaDialog: SwalComponent | any;
  @ViewChild('myTable') myTable: DataTablesResponse | any;

  ngOnInit(): void {
    this.notaService
      .getNotas()
      .subscribe((notas: Notas[]) => (this.notas = notas));

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: [0, 'desc'],
      processing: true,
      language: {
        decimal: '',
        emptyTable: 'No hay información',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ Entradas',
        infoEmpty: 'Mostrando 0 to 0 of 0 Entradas',
        infoFiltered: '(Filtrado de _MAX_ total entradas)',
        infoPostFix: '',
        thousands: ',',
        lengthMenu: 'Mostrar _MENU_ Entradas',
        loadingRecords: 'Cargando...',
        processing: 'Procesando...',
        search: 'Buscar:',
        zeroRecords: 'Sin resultados encontrados',
        paginate: {
          first: 'Primero',
          last: 'Ultimo',
          next: 'Siguiente',
          previous: 'Anterior',
        },
      },
      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .post<DataTablesResponse>(
            'http://localhost:8080/notas/datatable',
            dataTablesParameters,
            {}
          )
          .subscribe((resp) => {
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data,
            });
          });
      },
      columns: [
        {
          title: 'ID',
          data: 'id',
        },

        {
          title: 'ID Alumnos',
          data: 'id_alumnos',
        },

        {
          title: 'ID Modulos',
          data: 'id_modulos',
        },

        {
          title: 'Nota ',
          data: 'nota',
        },
        {
          title: 'Eliminar',
          data: null,
          render: (data: any, type: any, row: any) => {
            return (
              `<div class="d-flex">
                    <div>
                    <button class="btn btn-danger action-btn" style="width:40px">` +
              this.icono +
              `</button>
                  </div>
                  <div>&nbsp;</div>
                  <div> 
                    <button class="btn btn-primary actionEdit-btn" style="width:40px">` +
              this.iconoEdit +
              `</button>
                  </div>
                  </div>`
            );
          },
          className: 'action-column',
        },
      ],
      rowCallback: (row: Node, data: any, index: number) => {
        const rowElement = row as HTMLElement;
        const Id = data.id | 0;
        const actionCell = rowElement.querySelector('td:last-child');
        if (actionCell) {
          actionCell.setAttribute(
            'style',
            'display: flex; justify-content: center; '
          );
        }
        const actionButton = rowElement.querySelector('.action-btn');
        if (actionButton) {
          this.renderer.listen(actionButton, 'click', () => {
            this.eliminar(rowElement, Id);
            console.log('Row data:', data);
          });
        }
        const actionEditButton = rowElement.querySelector('.actionEdit-btn');
        if (actionEditButton) {
          this.renderer.listen(actionEditButton, 'click', () => {
            this.editar(Id);
            console.log('Edit row data:', data);
          });
        }
        return row;
      },
    };
  }

  ngAfterViewInit() {}

  async eliminar(rowElement: HTMLElement, dataId: number) {
    const resp = await this.confirmDialog.fire();
    if (resp.isConfirmed) {
      this.notaService.deleteNota(dataId).subscribe();
      const resp2 = await this.respuestaDialog.fire();
      rowElement.remove();
    }
  }

  editar(notaId: number) {
    this.router.navigate(['notas/edit', notaId]);
  }

  onClickSubmit(notaData: any) {
    // Implement the logic to handle form submission
    console.log('Form data:', notaData);
    // Add your logic to handle the form submission, e.g., call a service to save the nota
  }
}
