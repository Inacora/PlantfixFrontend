import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class OrderService {
  private apiUrl = 'http://localhost:8000/api/orders';

  constructor(private http: HttpClient) {}

 placeOrder(order: any): Observable<any> {
     return this.http.post(this.apiUrl, order, { withCredentials: true });
   }
  
  getOrders(): Observable<any> {
    return this.http.get(this.apiUrl, { withCredentials: true });
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

}