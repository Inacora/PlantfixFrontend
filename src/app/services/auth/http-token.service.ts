import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class HttpTokenService {

  constructor(private http: HttpClient) { }

  getCsrfToken() {
    return this.http.get<any>(`${baseURL}/sanctum/csrf-cookie`, { withCredentials: true, observe: 'response' });
  }

  getCsrfCookie(): Observable<void> {
    return this.http.get<void>(`${baseURL}/sanctum/csrf-cookie`, { withCredentials: true });
  }

  login(email: string, password: string,) {
    return this.http.post<any>(`${baseURL}/login`, { email, password }, { withCredentials: true });
  }

  register(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
  }) {
    return this.http.post<any>(`${baseURL}/register`, data, { withCredentials: true });
  }

  logout() {
    return this.http.post<any>(`${baseURL}/logout`, {}, { withCredentials: true });
  }

  getUser() {
    return this.http.get<any>(`${baseURL}/api/user`, { withCredentials: true });
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(`${baseURL}/api/users/${id}`, data, { withCredentials: true });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${baseURL}/api/users/${id}`, { withCredentials: true });
  }
}
