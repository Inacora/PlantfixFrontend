import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseURL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class HttpTokenService {

  constructor(private http: HttpClient) { }

  getCsrfToken() {
    return this.http.get<any>(`${baseURL}/sanctum/csrf-cookie`, { withCredentials: true, observe: 'response' });
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${baseURL}/login`, {email, password}, { withCredentials: true });
  }

  logout(){
    return this.http.post<any>(`${baseURL}/logout`, {}, { withCredentials: true });
  }

  getUser() {
    return this.http.get<any>(`${baseURL}/api/user`, { withCredentials: true });
  }
}
