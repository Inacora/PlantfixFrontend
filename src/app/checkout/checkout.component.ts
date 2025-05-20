import { Component } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { OrderService } from '../services/order/order.service';
import { HttpTokenService } from '../services/auth/http-token.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  cartItems: any[] = [];
  currentUser: any;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private tokenSvc: HttpTokenService
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
     this.tokenSvc.getUser();
  }

  checkout() {
    const order = {
      user_id: this.currentUser.id,
      total_price: this.getTotal(),
      items: this.cartItems.map(item => ({
        plant_id: item.id,
        quantity: item.quantity,
        price_at_time: item.price
      }))
    };

    this.orderService.placeOrder(order).subscribe(() => {
      alert('Pedido realizado con éxito');
      this.cartService.clearCart();
    });
  }

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
