import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from "./components/shared/header/header.component";
import { SidebarComponent } from "./components/shared/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { HttpTokenService } from './services/token/http-token.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  title = 'Plantfix';

  isOpen = signal(true);

  user: any | null;


  toggleSidebar() {
    this.isOpen.update(open => !open);
  }

  constructor(private tokenSvc : HttpTokenService, private router: Router) {
    this.user = this.tokenSvc.getUser().subscribe(response => {
    this.user = response;
  });
  }

  ngOnInit(): void {
  
    this.tokenSvc.getCsrfToken().subscribe({  
      
  })
}


}
