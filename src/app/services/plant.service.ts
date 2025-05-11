import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlantService {
  private apiUrl = 'http://localhost:8000/api/plants';

  constructor(private http: HttpClient) {}

  getPlants(): Observable<any[]> {
    return this.http.get<any[]>('/api/plants');
  }

  getPlant(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createPlant(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updatePlant(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deletePlant(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
