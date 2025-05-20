import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class PlantService {
  private apiUrl = 'http://localhost:8000/api/plants';

  constructor(private http: HttpClient) {}

  getPlants(): Observable<any> {
    return this.http.get(this.apiUrl, { withCredentials: true });
  }

  getPlant(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  createPlant(plant: any): Observable<any> {
    return this.http.post(this.apiUrl, plant, { withCredentials: true });
  }

  updatePlant(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  deletePlant(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
