import { Component } from '@angular/core';
import { PlantService } from '../services/plant.service';

@Component({
  selector: 'app-plant-shop',
  imports: [],
  templateUrl: './plant-shop.component.html',
  styleUrl: './plant-shop.component.css'
})
export class PlantShopComponent {
  constructor(private plantService: PlantService) {}

  plants: any[] = [];

  ngOnInit() {
  this.plantService.getPlants().subscribe(data => {
    this.plants = data as any[];
  });
  }
}
