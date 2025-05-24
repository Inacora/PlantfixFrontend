import { Component } from '@angular/core';
import { HttpTokenService } from '../services/auth/http-token.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateButtonComponent } from "../components/buttons/update-button/update-button.component";
import { DeleteButtonComponent } from "../components/buttons/delete-button/delete-button.component";
import { CancelButtonComponent } from "../components/buttons/cancel-button/cancel-button.component";

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule, UpdateButtonComponent, DeleteButtonComponent, CancelButtonComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  settingsForm!: FormGroup;
  user: any | null = null;
  userId: string | null = null;
  backendErrors: { [key: string]: string[] } = {};

  constructor(private tokenSvc: HttpTokenService, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    // Primero inicializa el formulario con valores vacíos
    this.settingsForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
    });

    // Luego obtén el usuario y actualiza el formulario con sus valores actuales
    this.tokenSvc.getUser().subscribe(response => {
      this.user = response;
      this.userId = this.user.id;
    });
  }

updateUser() {
  if (this.settingsForm.invalid) return;

  const rawFormData = this.settingsForm.value;
  const formData: any = {};

  Object.keys(rawFormData).forEach(key => {
    const value = rawFormData[key];
    if (value !== null && value !== '') {
      formData[key] = value;
    }
  });

  this.tokenSvc.updateUser(this.user.id, formData).subscribe({
    next: (response) => {
      console.log('User updated', response);
         alert('User updated successfully');
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
