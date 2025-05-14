import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  password_confirmation = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (this.password !== this.password_confirmation) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    };

    this.auth.register(data).subscribe({
      next: () => {
        this.auth.getUser().subscribe(user => {
          this.auth.setUser(user);
          this.router.navigate(['/']); // o donde prefieras redirigir después del registro
        });
      },
      error: err => {
        this.errorMessage = 'Registration failed';
        console.error(err);
      }
    });
  }
}
