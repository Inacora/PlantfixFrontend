import { Component } from '@angular/core';
import { UserService } from '../../services/users/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  constructor(private userService: UserService) {}

  users: any[] = [];

  ngOnInit() {
  this.userService.getUsers().subscribe(data => {
    this.users = data as any[];
  });
}
}