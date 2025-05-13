import { Component } from '@angular/core';
import { HeroComponent } from "../components/home/hero/hero.component";
import { AnimatedIconsComponent } from '../components/home/animated-icons/animated-icons.component';
import { HeroTextComponent } from "../components/home/hero-text/hero-text.component";
import { ProductItemComponent } from '../components/home/product-item/product-item.component';
import { ContactTextComponent } from "../components/home/contact-text/contact-text.component";

@Component({
  selector: 'app-home',
  imports: [HeroComponent, AnimatedIconsComponent, HeroTextComponent, ProductItemComponent, ContactTextComponent],
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent {

}
