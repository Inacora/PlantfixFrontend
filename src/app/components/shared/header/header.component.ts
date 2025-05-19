import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart/cart.service';
import { HttpTokenService } from '../../../services/token/http-token.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent {
  isMenuOpen = false;
  user: any | null = null;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  cartItemCount = 0;

  constructor(private cartService: CartService, private tokenSvc: HttpTokenService) {
    this.tokenSvc.getUser().subscribe(response => {
      this.user = response
    })
  }

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  getInitial() {
    return this.user?.name?.charAt(0).toUpperCase() || '';
  }

}
