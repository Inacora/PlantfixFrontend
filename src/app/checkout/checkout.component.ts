import { Component } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {
     this.cartItems = this.cartService.getItems();
  }

  checkout() {
    const order = {
      user_id: 1, // o tomar del sistema de login
      total_price: this.getTotal(),
      items: this.cartItems
    };

    this.orderService.placeOrder(order).subscribe(res => {
      alert('Pedido realizado con éxito');
      this.cartService.clearCart();
    });
  }

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
