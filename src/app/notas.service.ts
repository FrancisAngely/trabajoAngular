import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Notas } from './notas';

@Injectable({
  providedIn: 'root',
})
export class NotaService {
  private notasUrl = 'http://localhost:8080/notas'; // URL to notas api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  addNotas: any;

  constructor(private http: HttpClient) {}

  // Obtener todas las notas
  getNotas(): Observable<Notas[]> {
    return this.http
      .get<Notas[]>(this.notasUrl)
      .pipe(catchError(this.handleError<Notas[]>('getNotas', [])));
  }

  // Eliminar una nota por su ID
  deleteNota(id: number): Observable<any> {
    const url = `${this.notasUrl}/${id}`;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError<any>('deleteNota')));
  }

  // Manejo de errores HTTP
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
