import { Component } from '@angular/core';
import { PlantService } from '../services/plants/plant.service';
import { RouterModule } from '@angular/router';
import { AddButtonComponent } from '../components/buttons/add-button/add-button.component';
import { ShowButtonComponent } from "../components/buttons/show-button/show-button.component";
import { EditButtonComponent } from '../components/buttons/edit-button/edit-button.component';
import { SearchInputComponent } from "../components/inputs/search-input/search-input.component";

@Component({
  selector: 'app-plant',
  imports: [RouterModule, AddButtonComponent, ShowButtonComponent, EditButtonComponent, SearchInputComponent],
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