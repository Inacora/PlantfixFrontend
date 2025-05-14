import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get('/user', { withCredentials: true });
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    // Replace with actual HTTP request implementation
    return this.http.post('/api/login', credentials);
  }
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  register(data: any): Observable<any> {
    return this.http.post('/api/register', data);
  }

  loadUser() {
    this.getUser().subscribe({
      next: (user: any) => {
        this.userSubject.next(user);
      },
      error: () => {
        this.userSubject.next(null);
      }
    });
  }

  get userRole(): string | null {
    return this.userSubject.value?.role || null;
  }

  setUser(user: any) {
    this.userSubject.next(user);
  }
}

