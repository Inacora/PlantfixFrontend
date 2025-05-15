import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpTokenService } from '../../services/http-token.service';
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
      password: ['']
    });
  }

  onSubmit() {
    let { email, password } = this.loginForm.value;
    this.svc.login(email, password).subscribe({
      next: (res: any) => {
        if (res.token) {
          localStorage.setItem('authToken', res.token);
        }
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        this.errMessage = err;
      }
    });
  }
}
