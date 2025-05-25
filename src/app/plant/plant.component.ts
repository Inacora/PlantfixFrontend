import { Component } from '@angular/core';
import { PlantService } from '../services/plants/plant.service';
import { RouterModule } from '@angular/router';
import { AddButtonComponent } from '../components/buttons/add-button/add-button.component';
import { ShowButtonComponent } from "../components/buttons/show-button/show-button.component";
import { EditButtonComponent } from '../components/buttons/edit-button/edit-button.component';
import { SearchInputComponent } from "../components/inputs/search-input/search-input.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plant',
  imports: [RouterModule, AddButtonComponent, ShowButtonComponent, EditButtonComponent,FormsModule],
  templateUrl: './plant.component.html',
  styleUrl: './plant.component.css'
})
export class PlantComponent {

  constructor(private plantService: PlantService) {}

  plants: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

    query: string = '';
   ngOnInit(): void {
    this.loadPlants();
  }

  loadPlants(): void {
    this.plantService.getPlants(this.currentPage, this.itemsPerPage).subscribe(response => {
      this.plants = response.data;
      this.totalItems = response.total;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    });
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadPlants();
  }



   onSearch(): void {
    console.log("Buscando:", this.query);
    if (this.query.trim()) {
      this.plantService.searchPlants(this.query).subscribe(results => {
          this.plants = results.data;
      this.totalItems = results.total;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      });
    }
  }

}
