import { Component } from '@angular/core';
import { HttpTokenService } from '../services/auth/http-token.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  settingsForm!: FormGroup;
  user: any | null = null;
  userId: string | null = null;
 backendErrors: { [key: string]: string[] } = {};

  constructor(private tokenSvc: HttpTokenService, private router: Router, private fb: FormBuilder) {
    this.tokenSvc.getUser().subscribe(response => {
      this.user = response
      this.userId = this.user.id;
    })
  }

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
      role: ['user']
    });
  }

  updateUser() {
    const user = {
      name: this.settingsForm.get('name')?.value,
      email: this.settingsForm.get('email')?.value,
      password: this.settingsForm.get('password')?.value,
      password_confirmation: this.settingsForm.get('password_confirmation')?.value
    };

    if (this.userId) {
      this.tokenSvc.updateUser(this.userId || '', user).subscribe({
        next: (response) => {
          console.log('Account updated successfully', response);
          this.backendErrors = {};
          this.router.navigate(['/home']);
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

  deleteUser() {
    if (!this.userId) return;

    if (confirm('Are you sure you want to delete your account?')) {
      this.tokenSvc.deleteUser(this.userId).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (errorResponse) => {
          console.error('Error deleting account:', errorResponse);
        }
      });
    }
  }
}
