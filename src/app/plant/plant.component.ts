import { Component } from '@angular/core';
import { PlantService } from '../services/plant.service';

@Component({
  selector: 'app-plant',
  imports: [],
  templateUrl: './plant.component.html',
  styleUrl: './plant.component.css'
})
export class PlantComponent {
  constructor(private plantService: PlantService) {}

  plants: any[] = [];

  ngOnInit() {
  this.plantService.getPlants().subscribe(data => {
    this.plants = data as any[];
  });

  }

}