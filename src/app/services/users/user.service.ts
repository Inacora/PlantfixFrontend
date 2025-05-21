import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl, { withCredentials: true });
  }

  getUser(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  createUser(user: any) {
    return this.http.post(this.apiUrl, user, { withCredentials: true });
  }

  updateUser(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

}