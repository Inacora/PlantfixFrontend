import { Component } from '@angular/core';
import { HttpTokenService } from '../services/auth/http-token.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

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

 ngOnInit() {
  this.settingsForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    password_confirmation: ['']
  });

  this.tokenSvc.getUser().subscribe(response => {
    this.user = response;
    this.userId = this.user.id;
    this.loadUserData(); 
  });
}

  loadUserData() {
    this.tokenSvc.getUserData().subscribe(user => {
      this.settingsForm.patchValue({
        name: user.name,
        email: user.email
      });
    });
  }

  updateUser() {
    if (this.settingsForm.invalid) return;

    const formData = this.settingsForm.value;

    this.tokenSvc.updateUser(this.user.id, formData).subscribe({
      next: (response) => {
        console.log('User updated', response);
      },
      error: (errResponse) => {
        console.error('Error updating user', errResponse);
      }
    });
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
