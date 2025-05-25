import { Component } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { DeleteButtonComponent } from "../components/buttons/delete-button/delete-button.component";
import { ShopNowButtonComponent } from '../components/buttons/shop-now-button/shop-now-button.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [FormsModule, RouterModule, DeleteButtonComponent, ShopNowButtonComponent],
})
export class CartComponent {
  constructor(public cartService: CartService, private http: HttpClient, private router: Router) {}

 
  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
