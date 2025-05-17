import { Component } from '@angular/core';
import { PlantService } from '../../services/plants/plant.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-plant-shop',
  imports: [],
  templateUrl: './plant-shop.component.html',
  styleUrl: './plant-shop.component.css'
})
export class PlantShopComponent {
  constructor(private plantService: PlantService, private cartService: CartService) {}

  plants: any[] = [];

  ngOnInit() {
  this.plantService.getPlants().subscribe(data => {
    this.plants = data as any[];
  });
  }

  addToCart(plant: any) {
  this.cartService.addToCart(plant);
}
}
