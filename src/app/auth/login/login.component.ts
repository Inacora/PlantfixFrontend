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

  constructor(
    private svc: HttpTokenService,
    private router: Router,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
      remember: [false],
    });
  }

  onSubmit() {
   let { email, password, remember } = this.loginForm.value;
    this.svc.login(email, password, remember).subscribe({
      next: (res: any) => {
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        const rawMessage = err.error.message || 'An unexpected error occurred';
  
        if (err.status === 422 && err.error.errors){
          this.errMessage = 'Invalid email or password';
        } else {
          this.errMessage = rawMessage;
        }
      }
    });
  }  
}
