import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Notas } from './notas';

@Injectable({
  providedIn: 'root',
})
export class NotaService {
  private notasUrl = 'http://localhost:8080/notas'; // URL to notas api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getNotas(): Observable<Notas[]> {
    return this.http
      .get<Notas[]>(this.notasUrl)
      .pipe(catchError(this.handleError<Notas[]>('getNotas', [])));
  }

  addNotas(notas: Notas): Observable<Notas> {
    return this.http
      .post<Notas>(this.notasUrl, notas, this.httpOptions)
      .pipe(map((respuesta: any) => respuesta.notas));
  }

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
