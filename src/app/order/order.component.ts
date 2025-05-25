import { Component } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { RouterModule } from '@angular/router';
import { EditButtonComponent } from '../components/buttons/edit-button/edit-button.component';
import { SearchInputComponent } from "../components/inputs/search-input/search-input.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  imports: [RouterModule, EditButtonComponent, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
constructor(private orderService: OrderService){}

orders: any[] = [];
 currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
    query_order: string = '';
  ngOnInit() {
  this.orderService.getOrders().subscribe(data => {
    this.loadOrders()
  });

  }


  loadOrders(): void {
    this.orderService.getOrders(this.currentPage, this.itemsPerPage).subscribe(response => {
      this.orders = response.data;
      this.totalItems = response.total;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    });
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadOrders();
  }

   onSearch(): void {
    console.log("Buscando:", this.query_order);
    if (this.query_order.trim()) {
      this.orderService.searchOrders(this.query_order).subscribe(results => {
          this.orders = results.data;
      this.totalItems = results.total;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      });
    }
  }
}
