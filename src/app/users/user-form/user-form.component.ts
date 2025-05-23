import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DeleteButtonComponent } from "../../components/buttons/delete-button/delete-button.component";
import { UpdateButtonComponent } from "../../components/buttons/update-button/update-button.component";
import { CreateButtonComponent } from "../../components/buttons/create-button/create-button.component";
import { CancelButtonComponent } from '../../components/buttons/cancel-button/cancel-button.component';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, RouterModule, DeleteButtonComponent, CancelButtonComponent, UpdateButtonComponent, CreateButtonComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    role: new FormControl(''),
  });

  constructor(private route: ActivatedRoute, private service: UserService, private router: Router) { }

  users: any[] = [];
  userId: string | null = null;
  backendErrors: { [key: string]: string[] } = {};
  isEditMode = false;

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.userId;

    this.service.getUsers().subscribe(data => {
      this.backendErrors = {};
      this.users = data as any[];
    });

    if (this.isEditMode && this.userId) {
      this.service.getUser(this.userId).subscribe(user => {
        this.userForm.patchValue(user);
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser() {
    const user = {
      name: this.userForm.get('name')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      password_confirmation: this.userForm.get('password_confirmation')?.value,
      role: this.userForm.get('role')?.value,
    };

    this.service.createUser(user).subscribe({
      next: (response) => {
        console.log('User saved successfully', response);
        this.backendErrors = {};
        this.router.navigate(['/users']);
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

  updateUser() {
    const user = {
      name: this.userForm.get('name')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      password_confirmation: this.userForm.get('password_confirmation')?.value,
      role: this.userForm.get('role')?.value,
    };

    if (this.userId) {
      this.service.updateUser(this.userId || '', user).subscribe({
        next: (response) => {
          console.log('User updated successfully', response);
          this.backendErrors = {};
          this.router.navigate(['/users']);
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

    if (confirm('Are you sure you want to delete this user?')) {
      this.service.deleteUser(this.userId).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (errorResponse) => {
          console.error('Error deleting user:', errorResponse);
        }
      });
    }
  }
} 