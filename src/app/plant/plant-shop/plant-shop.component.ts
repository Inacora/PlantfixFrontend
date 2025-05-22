import { Component } from '@angular/core';
import { PlantService } from '../../services/plants/plant.service';
import { CartService } from '../../services/cart/cart.service';
import { AddToCartButtonComponent } from '../../components/buttons/add-to-cart-button/add-to-cart-button.component';
import { AddedToCartButtonComponent } from '../../components/buttons/added-to-cart-button/added-to-cart-button.component';
import { OutOfStockButtonComponent } from '../../components/buttons/out-of-stock-button/out-of-stock-button.component';

@Component({
  selector: 'app-plant-shop',
  imports: [AddToCartButtonComponent, AddedToCartButtonComponent, OutOfStockButtonComponent],
  templateUrl: './plant-shop.component.html',
  styleUrl: './plant-shop.component.css'
})

export class PlantShopComponent {
  plants: any[] = [];
  addedPlants = new Set<number>(); 

  constructor(private plantService: PlantService, private cartService: CartService) {}

  ngOnInit() {
    this.plantService.getPlants().subscribe(data => {
      this.plants = data as any[];
    });
  }

  addToCart(plant: any) {
    const added = this.cartService.addToCart(plant);
    if (added) {
      this.addedPlants.add(plant.id);
      setTimeout(() => {
        this.addedPlants.delete(plant.id);
      }, 2000); 
    }
  }

  isAdded(plant: any): boolean {
    return this.addedPlants.has(plant.id);
  }
}
