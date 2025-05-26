import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UpdateButtonComponent } from "../../components/buttons/update-button/update-button.component";
import { DeleteButtonComponent } from "../../components/buttons/delete-button/delete-button.component";
import { CancelButtonComponent } from '../../components/buttons/cancel-button/cancel-button.component';

@Component({
  selector: 'app-order-detail',
  imports: [RouterModule, FormsModule, UpdateButtonComponent, DeleteButtonComponent, CancelButtonComponent],
  templateUrl: './order-detail.component.html',
  styleUrls: []
})
export class OrderDetailComponent implements OnInit{

  orderID: string | null = null;
  order: any = null;
  user: any | null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.orderID = this.route.snapshot.paramMap.get('id');
    if (this.orderID) {
      this.orderService.getOrder(this.orderID).subscribe(data => {
        this.order = data;
      });
    }

       this.orderService.getUserByOrder(this.orderID).subscribe(user => {
        this.user = user;
    });
  }

  updateStatus() {
  if (this.orderID && this.order?.status) {
    this.orderService.updateOrderStatus(this.orderID, this.order.status).subscribe({
      next: (response) => {
        alert('Order status updated successfully.');
        console.log(response);
      },
      error: (errorResponse) => {
        console.error(errorResponse);
        alert('Error updating order status.');
      }
    });
  }
}

deleteOrder() {
  if (!this.orderID) return;

  if (confirm('Are you sure you want to delete this order?')) {
    this.orderService.deleteOrder(this.orderID).subscribe({
      next: () => {
        alert('Order deleted successfully.');
        this.router.navigate(['/orders']);
      },
      error: (errorResponse) => {
        console.error('Error deleting order:', errorResponse);
        alert('Error deleting order.');
      }
    });
  }
}



}
