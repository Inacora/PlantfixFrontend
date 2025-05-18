import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpTokenService } from '../../services/token/http-token.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errMessage: string | null = null;

  constructor(
    private svc: HttpTokenService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: ['']
    });
  }

  onSubmit(): void {
    this.errMessage = null;

    const payload = this.registerForm.value;

    // 1) Primero pedimos la cookie CSRF
    this.svc.getCsrfCookie()
      .pipe(
        // 2) Una vez establecida, llamamos a register
        switchMap(() => this.svc.register(payload))
      )
      .subscribe({
        next: () => {
          // Registro ok → direccionamos al home
          this.router.navigate(['/home']);
        },
        error: err => {
          // Manejo de errores igual que en login
          const rawMessage = err.error?.message || 'An unexpected error occurred';
          if (err.status === 422 && err.error.errors) {
            this.errMessage = 'Invalid input. Please check all fields.';
          } else {
            this.errMessage = rawMessage;
          }
        }
      });
  }
}
