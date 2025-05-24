import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpTokenService } from '../../../services/auth/http-token.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  isOpen = signal(true);
  errMessage: string | null = null;
  user: any | null = null;

  constructor(
    private svc: HttpTokenService,
  ) {}

   ngOnInit(): void {
    this.svc.getUser().subscribe({
      next: (res: any) => {
        this.user = res;
      },
      error: (err: any) => {
        this.errMessage = err;
      }
    });
  }

  toggleSidebar() {
    this.isOpen.update(open => !open);
  }
}
