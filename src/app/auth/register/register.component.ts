import { UserService } from '../../services/users/user.service';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  constructor(private route: ActivatedRoute, private service: UserService, private router: Router) { }

  backendErrors: { [key: string]: string[] } = {};

  createUser() {
      const user = {
        name: this.userForm.get('name')?.value,
        email: this.userForm.get('email')?.value,
        password: this.userForm.get('password')?.value,
        password_confirmation: this.userForm.get('confirmPassword')?.value, 
        role: 'user',
      };

      this.service.createUser(user).subscribe({
        next: (response) => {
        console.log('User saved successfully', response);
        this.backendErrors = {};
        this.router.navigate(['/login']);
      },
      error: (errorResponse) => {
        if (errorResponse.status === 422) {
          this.backendErrors = errorResponse.error.errors;
          } else {
            console.error('Unexpected error:', errorResponse);
          }
        }
      });
    }
  }

  