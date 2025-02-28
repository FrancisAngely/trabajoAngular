import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Alumnos } from './alumnos';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private alumnosUrl = 'http://localhost:8080/alumnos';  // URL to alumnos api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Obtener todos los alumnos
  getAlumnos(): Observable<Alumnos[]> {
    return this.http.get<Alumnos[]>(this.alumnosUrl)
      .pipe(
        catchError(this.handleError<Alumnos[]>('getAlumnos', []))
      );
  }

  // Eliminar un alumno por su ID
  deleteAlumno(id: number): Observable<any> {
    const url = `${this.alumnosUrl}/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('deleteAlumno'))
      );
  }

  // Manejo de errores HTTP
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);  // log to console instead
      return of(result as T);
    };
  }
}
