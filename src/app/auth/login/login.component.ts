import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpTokenService } from '../../services/auth/http-token.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  errMessage!: string | null;
  loginForm!: FormGroup;
  user: any | null = null;

  constructor(
    private svc: HttpTokenService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });

    // Verificar si el usuario ya está autenticado
    this.svc.getUser().subscribe({
      next: (user) => {
        this.user = user;
        this.router.navigate(['/home']);
      },
      error: () => {
        // Si no está autenticado, no hacer nada
      }
    });
  }

  onSubmit() {
  const { email, password } = this.loginForm.value;

  this.svc.getCsrfCookie().subscribe({
    next: () => {
      this.svc.login(email, password).subscribe({
        next: () => {
          // Después del login, obtiene los datos del usuario
          this.svc.getUser().subscribe({
            next: (user) => {
              // Aquí puedes guardar los datos del usuario
              this.user = user;

              // Si quieres, guarda el rol en sessionStorage
              sessionStorage.setItem('role', user.role); // 🔐 o en un servicio
              
              this.router.navigate(['/home']);
            },
            error: () => {
              this.errMessage = 'No se pudo obtener la información del usuario';
            }
          });
        },
        error: (err) => {
          const rawMessage = err?.error?.message || 'An unexpected error occurred';
          if (err?.status === 422 && err?.error?.errors) {
            this.errMessage = 'Invalid email or password';
          } else {
            this.errMessage = rawMessage;
          }
        }
      });
    },
    error: () => {
      this.errMessage = 'No se pudo obtener el token CSRF';
    }
  });
}

}