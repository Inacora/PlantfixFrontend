import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get('/user', { withCredentials: true });
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

