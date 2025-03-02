import { Injectable } from '@angular/core';
import { Role } from './role';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private rolesUrl = 'http://localhost:8080/roles'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getRoles(): Observable<Role[]> {
    return this.http
      .get<Role[]>(this.rolesUrl)
      .pipe(map((respuesta: any) => respuesta.roles));
  }

  getRole(id: number): Observable<Role> {
    const url = `${this.rolesUrl}/${id}`;
    return this.http
      .get<Role>(url)
      .pipe(map((respuesta: any) => respuesta.role));
  }

  addRole(role: Role): Observable<Role> {
    return this.http
      .post<Role>(this.rolesUrl, role, this.httpOptions)
      .pipe(map((respuesta: any) => respuesta.role));
  }

  updateRole(role: Role): Observable<any> {
    const id = role.id;
    const url = `${this.rolesUrl}/${id}`;
    return this.http.put(url, role, this.httpOptions);
  }

  deleteRole(id: number): Observable<Role> {
    const url = `${this.rolesUrl}/${id}`;

    return this.http.delete<Role>(url, this.httpOptions);
  }
}
