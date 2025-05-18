import { Component } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [FormsModule, RouterModule],
})
export class CartComponent {
  constructor(public cartService: CartService, private http: HttpClient) {}

  placeOrder() {
    const order = {
      items: this.cartService.getCart(),
      total: this.cartService.getTotalPrice()
    };

    this.http.post('/api/orders', order).subscribe(() => {
      alert('Pedido realizado con éxito');
      this.cartService.clearCart();
    });
  }
}
