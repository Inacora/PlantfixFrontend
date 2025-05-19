import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpTokenService } from '../../services/token/http-token.service';
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
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
    
    this.user= this.svc.getUser();
      if(this.user!=null){
      this.router.navigate(['/home']);

    }
  }

  onSubmit() {
  const { email, password } = this.loginForm.value;

  this.svc.getCsrfCookie().subscribe({
    next: () => {
      this.svc.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          const rawMessage = err.error.message || 'An unexpected error occurred';
          if (err.status === 422 && err.error.errors) {
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
