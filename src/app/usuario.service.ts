import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";
import { LoginModel } from './login';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
private usuariosUrl = 'http://localhost:8080/usuarios';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor( private http: HttpClient,private messageService: MessageService,private cookies: CookieService) { }

 
  getUsuarios(): Observable<Usuario[]> {
     return this.http.get<Usuario[]>(this.usuariosUrl)
     .pipe ( map ( ( respuesta : any ) => respuesta.usuarios ) ) ;
  }

   getUsuario(id: number): Observable<Usuario> {
       const url = `${this.usuariosUrl}/${id}`;
       return this.http.get<Usuario>(url)
       .pipe ( map ( ( respuesta : any ) => respuesta.usuario ) ) ;
   }

    addUsuario(usuario: Usuario): Observable<Usuario> {
       return this.http.post<Usuario>(this.usuariosUrl, usuario, this.httpOptions)
       .pipe ( map ( ( respuesta : any ) => respuesta.cliente ) ) ;
     
     }
    updateUsuario(usuario: Usuario): Observable<any> {
      const id=usuario.id;
      const url = `${this.usuariosUrl}/${id}`;
      return this.http.put(url, usuario, this.httpOptions);
    }
    deleteUsuario(id: number): Observable<Usuario> {
      const url = `${this.usuariosUrl}/${id}`;
    
      return this.http.delete<Usuario>(url, this.httpOptions);
    }

     /** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}
/**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

login(usuario: LoginModel): Observable<any> {
  const url = `${this.usuariosUrl}/login`;
  return this.http.post(url, usuario)
       .pipe ( map ( ( respuesta : any ) => respuesta.usuario ) ) ;
}

setToken(token: string) {
  this.cookies.set("token", token);
}
getToken() {
  return this.cookies.get("token");
}
getUserLogged() {
  const token = this.getToken();
}
}
