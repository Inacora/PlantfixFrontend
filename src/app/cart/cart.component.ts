import { Component } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [FormsModule, RouterModule],
})
export class CartComponent {
  constructor(public cartService: CartService, private http: HttpClient, private router: Router) {}

 
  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
