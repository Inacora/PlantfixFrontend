import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpTokenService } from '../../services/auth/http-token.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errMessage: string | null = null;
  user: any | null = null;

  constructor(
    private svc: HttpTokenService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
      role: ['user']
    });
    
    this.svc.getUser().subscribe({
      next: (user) => {
        this.user = user;
        this.router.navigate(['/home']);
      },
      error: () => {
      }
    });
  }

  onSubmit(): void {
    this.errMessage = null;

    const payload = this.registerForm.value;

    this.svc.getCsrfCookie()
      .pipe(
        switchMap(() => this.svc.register(payload))
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: err => {
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
