import { Component, signal, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/shared/header/header.component";
import { SidebarComponent } from "./components/shared/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { HttpTokenService } from './services/http-token.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  title = 'Plantfix';

  isOpen = signal(true);

  toggleSidebar() {
    this.isOpen.update(open => !open);
  }

  errMessage: string | null = null;
  user: any | null = null;

  constructor(
    private svc: HttpTokenService,
    private router: Router
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
}
