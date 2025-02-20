import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, TemplateRef, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { faCoffee, faStar as faStarSolid, faDownload, faTrash, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { SweetAlert2Module, SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from '../usuario';
import { Role } from '../role';
import { DataTablesResponse } from '../datatables-response';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit, AfterViewInit, OnDestroy {
  usuarios: Usuario[] = [];
  roles: Role[] = [];
  faDownload = faDownload;
  faTrash = faTrash;
  faCoffee = faCoffee;
  faCirclePlus = faCirclePlus;
  icono!: string;
  icons = { faCoffee, faStarSolid, faStarRegular };
  message = '';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  @ViewChild('demoNg') demoNg!: TemplateRef<any>;
  @ViewChild('confirmDialog') confirmDialog: SwalComponent | undefined;
  @ViewChild('swal1') respuestaDialog: SwalComponent | undefined;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective | undefined;
  usuarioService: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private http: HttpClient,
    // private usuarioService: UsuarioService,
    // private messageService: MessageService,
    // private roleService: RoleService
  ) {}

  ngOnInit(): void {
    // this.roleService.getRoles().subscribe(roles => this.roles = roles);

    this.icono = `<fa-icon class="ng-fa-icon" size="xs">
      <svg aria-hidden="true" data-prefix="${this.faTrash.prefix}" data-icon="${this.faTrash.iconName}"
      class="svg-inline--fa fa-${this.faTrash.iconName}" role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 ${this.faTrash.icon[0]} ${this.faTrash.icon[1]}">
      <path fill="currentColor" d="${this.faTrash.icon[4]}"></path></svg></fa-icon>`;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: [[0, 'asc']],
      processing: true,
      language: {
        decimal: '',
        emptyTable: 'No data available in table',
        info: 'Showing _START_ to _END_ of _TOTAL_ entries',
        infoEmpty: 'Showing 0 to 0 of 0 entries',
        infoFiltered: '(filtered from _MAX_ total entries)',
        infoPostFix: '',
        thousands: ',',
        lengthMenu: 'Show _MENU_ entries',
        loadingRecords: 'Loading...',
        processing: 'Processing...',
        search: 'Search:',
        zeroRecords: 'No matching records found',
        paginate: {
          first: 'First',
          last: 'Last',
          next: 'Next',
          previous: 'Previous'
        }
      },
      ajax: (dataTablesParameters: any, callback) => {
        this.http.post<DataTablesResponse>("http://localhost:8080/usuarios/datatable", dataTablesParameters, {})
          .subscribe({
            next: (resp) => {
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: resp.data,
              });
            },
            error: (err) => {
              console.error("Error al cargar datos:", err);
              callback({
                recordsTotal: 0,
                recordsFiltered: 0,
                data: [],
              });
            }
          });
      },
      columns: [
        { title: "ID", data: "id" },
        { title: "First name", data: "nombre" },
        { title: "Apellido", data: "apellido" },
        {
          title: 'Eliminar',
          data: null,
          render: () => `<div><button class="btn btn-danger action-btn" style="width:40px">${this.icono}</button></div>`,
          className: 'action-column'
        }
      ],
      rowCallback: (row: Node, data: any) => {
        const rowElement = row as HTMLElement;
        const actionButton = rowElement.querySelector('.action-btn');
        if (actionButton) {
          this.renderer.listen(actionButton, 'click', () => {
            this.eliminar(rowElement, data.id);
          });
        }
        return row;
      }
    };
  }

  ngAfterViewInit() {
    this.dtTrigger.next(this.dtOptions);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  async eliminar(rowElement: HTMLElement, dataId: number) {
    const resp = await this.confirmDialog?.fire();
    if (resp?.isConfirmed) {
      this.usuarioService.deleteUsuario(dataId).subscribe(() => {
        rowElement.remove();
        this.respuestaDialog?.fire();
      });
    }
  }

  add(data: any) {
    const usuario: Usuario = {
      id: 0,
      email: data.email.trim(),
      password: data.password.trim(),
      nombre: data.nombre.trim(),
      apellido: data.apellido.trim(),
      id_comercios: Number(data.id_comercios),
      id_roles: Number(data.id_roles),
      created_at: new Date(),
      updated_at: new Date()
    };

    this.dtElement?.dtInstance.then((dtInstance: any) => {
      dtInstance.destroy();
      this.dtTrigger.next({});
    });

    if (!usuario.nombre) return;

    this.usuarioService.addUsuario(usuario).subscribe((newUsuario: Usuario) => {
      this.usuarios.push(newUsuario);
      this.dtElement?.dtInstance.then((dtInstance: any) => {
        dtInstance.row.add(newUsuario).draw();
      });
    });
  }
}
