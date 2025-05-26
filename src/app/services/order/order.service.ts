import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class OrderService {
  private apiUrl = 'http://localhost:8000/api/orders';

  constructor(private http: HttpClient) {}

 placeOrder(order: any): Observable<any> {
     return this.http.post(this.apiUrl, order, { withCredentials: true });
   }

 getOrders(page: number = 1, perPage: number = 8, query: string = ''): Observable<any> {
  let params = new HttpParams()
    .set('page', page.toString())
    .set('perPage', perPage.toString());

  if (query.trim()) {
    params = params.set('q', query.trim());
  }

  return this.http.get(this.apiUrl, { params, withCredentials: true });
}
  getOrder(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  updateOrderStatus(id: string, status: string): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${id}/status`, { status }, { withCredentials: true });
}

deleteOrder(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
}



 searchOrders(query: string): Observable<any> {
    const params = new HttpParams().set('q', query);
  return this.http.get(`${this.apiUrl}/search`, { params, withCredentials: true });
  }

  getUserByOrder(orderId: string | null): Observable<any> {
  return this.http.get(`http://localhost:8000/api/orders/${orderId}/user`, { withCredentials: true });
}
}
