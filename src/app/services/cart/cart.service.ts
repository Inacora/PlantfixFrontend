import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCount.asObservable();

  constructor() { }

  getItems() {
  return this.cart;
}

  addToCart(plant: any): boolean {
  if (plant.stock <= 0) {
    alert("Out of stock");
    return false;  
  }
  const found = this.cart.find(p => p.id === plant.id);
  if (found) {
    if (found.quantity < found.stock) {
      found.quantity++;
      this.updateCartCount();
      return true; 
    } else {
      alert("You cannot add more than the available quantity in stock");
      return false; 
    }
  } else {
    this.cart.push({ ...plant, quantity: 1 });
    this.updateCartCount();
    return true;    
  }
}


  clearCart() {
    this.cart = [];
  }

  updateCartCount() {
    const total = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCount.next(total);
  }

  updateQuantity(item: any, quantity: number) {
    const cartItem = this.cart.find(i => i.id === item.id);
    if (cartItem) {
      cartItem.quantity = Math.max(1, Math.min(quantity, cartItem.stock));
      this.updateCartCount();
    }
  }

  getTotalPrice() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  removeFromCart(item: any) {
    this.cart = this.cart.filter(i => i.id !== item.id);
    this.updateCartCount();
  }

}
