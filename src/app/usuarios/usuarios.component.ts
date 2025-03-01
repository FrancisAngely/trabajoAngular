import {
  Component,
  AfterViewInit,
  OnInit,
  TemplateRef,
  ViewChild,
  ChangeDetectorRef,
  Renderer2,
} from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { MessageService } from '../message.service';
import { DataTablesModule } from 'angular-datatables';
import { DataTablesResponse } from '../datatables-response';
import { DataTableDirective } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { IDemoNgComponentEventType } from '../ng-template-ref-event-type';
import { NgTemplateRefComponent } from '../ng-template-ref/ng-template-ref.component'; // Ensure this path is correct

// import { DataTables.Settings } from 'angular-datatables';
import {
  SweetAlert2Module,
  SwalComponent,
  SwalPortalTargets,
} from '@sweetalert2/ngx-sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faCoffee,
  faStar as faStarSolid,
  faDownload,
  faTrash,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { Role } from '../role';
import { RoleService } from '../role.service';

import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  delete(_t5: Usuario) {
    throw new Error('Method not implemented.');
  }
  onClickSubmit(arg0: any) {
    throw new Error('Method not implemented.');
  }
  usuarios: Usuario[] = [];
  roles: Role[] = [];
  faDownload = faDownload;
  faTrash = faTrash;
  faCoffee = faCoffee;
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

  icons = { faCoffee, faStarSolid, faStarRegular };

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private roleService: RoleService
  ) {}
  message = '';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  usuario: Usuario = {
    id: 1,
    email: 'luis@menasl.com',
    password: '123',
    nombre: 'Luis',
    apellido: 'Mena',
    id_roles: 1,
    created_at: new Date('2025-01-01 00-00-00'),
    updated_at: new Date('2025-01-01 00-00-00'),
  };

  /* usuarios = USUARIOS;*/
  selectedUsuario?: Usuario;
  onSelect(usuario: Usuario): void {
    this.selectedUsuario = usuario;
    this.messageService.add(
      `UsuariosComponent: Selected usuario id=${usuario.id}`
    );
  }

  dtOptions: Config = {};

  @ViewChild('demoNg') demoNg!: TemplateRef<NgTemplateRefComponent>;

  columns: Array<any> = [];

  ngOnInit(): void {
    this.roleService.getRoles().subscribe((roles) => (this.roles = roles));

    const self = this;
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
            'http://localhost:8080/usuarios/datatable',
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
          title: 'First name',
          data: 'nombre',
        },
        {
          title: 'Apellido',
          data: 'apellido',
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
        // Cast row to HTMLElement to access querySelector
        const rowElement = row as HTMLElement;
        const Id = data.id | 0;
        // Ensure the last cell (Actions column) is styled
        const actionCell = rowElement.querySelector('td:last-child');
        if (actionCell) {
          actionCell.setAttribute(
            'style',
            'display: flex; justify-content: center; '
          );
        }
        // Find the button in the row and attach a click listener using Renderer2
        const actionButton = rowElement.querySelector('.action-btn');
        if (actionButton) {
          this.renderer.listen(actionButton, 'click', () => {
            this.eliminar(rowElement, Id);
            console.log('Row data:', data); // Log the data for the clicked row
          });
        }
        const EditactioButton = rowElement.querySelector('.actionEdit-btn');
        if (EditactioButton) {
          this.renderer.listen(EditactioButton, 'click', () => {
            console.log('editar');
            this.router.navigate(['admin/usuarios/detail/' + data.id]);
          });
        }
        return row;
      },
    };
  }

  ngAfterViewInit() {}
  @ViewChild('confirmDialog') confirmDialog: SwalComponent | any;
  @ViewChild('swal1') respuestaDialog: SwalComponent | any;
  @ViewChild('myTable') myTable: DataTablesResponse | any;
  async onCaptureEvent(event: IDemoNgComponentEventType) {
    this.message = `Event '${event.cmd}' with data '${JSON.stringify(
      event.data
    )}`;

    if (event.cmd == 'action1') {
      const resp = await this.confirmDialog.fire();
      if (resp.isConfirmed) {
        this.usuarioService.deleteUsuario(event.data.id).subscribe();
        const resp2 = await this.respuestaDialog.fire();
      }
    }
    if (event.cmd == 'action2') {
      //console.log('editar');
      this.router.navigate(['admin/usuarios/detail/' + event.data.id]);
    }
  }

  ngOnDestroy(): void {}

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */

  async eliminar(rowElement: HTMLElement, dataId: number) {
    const resp = await this.confirmDialog.fire();
    if (resp.isConfirmed) {
      this.usuarioService.deleteUsuario(dataId).subscribe();
      const resp2 = await this.respuestaDialog.fire();
      rowElement.remove();
    }
  }
}
