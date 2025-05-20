import { Component } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order',
  imports: [RouterModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
constructor(private orderService: OrderService){}

orders: any[] = [];

  ngOnInit() {
  this.orderService.getOrders().subscribe(data => {
    this.orders = data as any[];
  });

  }
}
