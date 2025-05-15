import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  user: any = null;


  toggleSidebar() {
    this.isOpen.update(open => !open);
  }

  constructor(private tokenSvc : HttpTokenService) { 
    this.user = localStorage.getItem('user'); 
  }

  ngOnInit(): void {
    this.tokenSvc.getCsrfToken().subscribe({  
  })
}
}
