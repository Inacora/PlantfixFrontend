import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class PlantService {
  private apiUrl = 'http://localhost:8000/api/plants';

  constructor(private http: HttpClient) { }

  getPlants(page: number = 1, perPage: number = 8): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('perPage', perPage.toString());

    return this.http.get(this.apiUrl, { params, withCredentials: true });
  }

  getPlantFamilies(): Observable<any[]> {
    return this.http.get<any[]>('/api/plant-families', { withCredentials: true });
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

  searchPlants(query: string): Observable<any> {
    const params = new HttpParams().set('q', query);
    return this.http.get(`${this.apiUrl}/search`, { params, withCredentials: true });
  }
}
