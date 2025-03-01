import { Injectable } from '@angular/core';
import { Modulo } from './modulos';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ModuloService {
  private modulosUrl = 'http://localhost:8080/modulos'; // URL de la API
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getModulos(): Observable<Modulo[]> {
    return this.http
      .get<Modulo[]>(this.modulosUrl)
      .pipe(map((respuesta: any) => respuesta.modulos));
  }

  getModulo(id: number): Observable<Modulo> {
    const url = `${this.modulosUrl}/${id}`;
    return this.http
      .get<Modulo>(url)
      .pipe(map((respuesta: any) => respuesta.modulo));
  }

  addModulo(modulo: Modulo): Observable<Modulo> {
    return this.http
      .post<Modulo>(this.modulosUrl, modulo, this.httpOptions)
      .pipe(map((respuesta: any) => respuesta.modulo));
  }

  updateModulo(modulo: Modulo): Observable<any> {
    const id = modulo.id;
    const url = `${this.modulosUrl}/${id}`;
    return this.http.put(url, modulo, this.httpOptions);
  }

  deleteModulo(id: number): Observable<Modulo> {
    const url = `${this.modulosUrl}/${id}`;
    return this.http.delete<Modulo>(url, this.httpOptions);
  }
}
