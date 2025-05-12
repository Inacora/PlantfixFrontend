import { Component } from '@angular/core';
import { HeroComponent } from "../components/home/hero/hero.component";
import { FormComponent } from "../components/home/form/form.component";
import { AnimatedIconsComponent } from '../components/home/animated-icons/animated-icons.component';
import { HeroTextComponent } from "../components/home/hero-text/hero-text.component";
import { ProductItemComponent } from '../components/home/product-item/product-item.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, FormComponent, AnimatedIconsComponent, HeroTextComponent, ProductItemComponent],
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent {

}
