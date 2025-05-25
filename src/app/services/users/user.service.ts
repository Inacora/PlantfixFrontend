import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8000/api/users';

  constructor(private http: HttpClient) { }

   getUsers(page: number = 1, perPage: number = 10, query: string = ''): Observable<any> {
  let params = new HttpParams()
    .set('page', page.toString())
    .set('perPage', perPage.toString());

  if (query.trim()) {
    params = params.set('q', query.trim());
  }

  return this.http.get(this.apiUrl, { params, withCredentials: true });
}


 searchUsers(query: string): Observable<any> {
    const params = new HttpParams().set('q', query);
  return this.http.get(`${this.apiUrl}/search`, { params, withCredentials: true });
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
