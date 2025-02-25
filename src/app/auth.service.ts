import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/usuarios'; // Replace with your API URL
  private authToken = new BehaviorSubject<string | null>(this.getToken());
httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {}

  // Login function
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        this.setToken(response.token);
      })
    );
  }

  // Logout function
  logout(): void {
    this.authToken.next(null);
    localStorage.removeItem('token');
  }

  // Store token
  private setToken(token: string): void {
    localStorage.setItem('token', token);
    this.authToken.next(token);
  }

  // Retrieve token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
