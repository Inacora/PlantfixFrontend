import { Component } from '@angular/core';
import { UserService } from '../../services/users/user.service';
import { RouterModule } from '@angular/router';
import { AddButtonComponent } from '../../components/buttons/add-button/add-button.component';
import { ShowButtonComponent } from '../../components/buttons/show-button/show-button.component';
import { EditButtonComponent } from '../../components/buttons/edit-button/edit-button.component';
import { SearchInputComponent } from "../../components/inputs/search-input/search-input.component";

@Component({
  selector: 'app-user',
  imports: [RouterModule, AddButtonComponent, ShowButtonComponent, EditButtonComponent, SearchInputComponent],
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