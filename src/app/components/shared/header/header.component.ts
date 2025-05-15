import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpTokenService} from '../../../services/http-token.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(private tokenSvc: HttpTokenService) { }
  logout() {
    this.tokenSvc.logout().subscribe({
      next: (res: any) => {
        localStorage.removeItem('user');
        window.location.reload();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}
