import { Component } from '@angular/core';
import { ShopNowButtonComponent } from "../../buttons/shop-now-button/shop-now-button.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-text',
  imports: [ShopNowButtonComponent, RouterModule],
  templateUrl: './hero-text.component.html',
  styleUrls: []
})
export class HeroTextComponent {

}
