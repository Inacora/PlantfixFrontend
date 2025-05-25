import { Component } from '@angular/core';
import { UserService } from '../../services/users/user.service';
import { RouterModule } from '@angular/router';
import { AddButtonComponent } from '../../components/buttons/add-button/add-button.component';
import { EditButtonComponent } from '../../components/buttons/edit-button/edit-button.component';
import { SearchInputComponent } from "../../components/inputs/search-input/search-input.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [RouterModule, AddButtonComponent, EditButtonComponent, SearchInputComponent,FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  constructor(private userService: UserService) {}

  users: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
query_user: string = ''; 

   ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // Supongo que tu servicio se adaptó para recibir paginación y query (puedes ajustarlo)
    this.userService.getUsers(this.currentPage, this.itemsPerPage, this.query_user).subscribe(response => {
      this.users = response.data;
      this.totalItems = response.total;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    });
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadUsers();
  }



   onSearch(): void {
    console.log("Buscando:", this.query_user);
    if (this.query_user.trim()) {
      this.userService.searchUsers(this.query_user).subscribe(results => {
          this.users = results.data;
      this.totalItems = results.total;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      });
    }
  }
}
