import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
     });
   
     constructor(private route: ActivatedRoute, private service: UserService) {}
   
     users: any[] = [];
  
     ngOnInit() {
       this.service.getUsers().subscribe(data => {
         this.users = data as any[];
       });
     }  
   
     createUser() {
       const user = {
        name: this.userForm.get('name')?.value,
        email: this.userForm.get('email')?.value,
        password: this.userForm.get('password')?.value,
       };
   
       this.service.createUser(user).subscribe(response => {
         console.log('User saved successfully', response);
       }, error => {
         console.error('Error saving user', error);
       });
     }
}
