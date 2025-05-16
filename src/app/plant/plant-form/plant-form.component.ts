import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-plant-form',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './plant-form.component.html',
  styleUrl: './plant-form.component.css'
})

export class PlantFormComponent {
  plantForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    image_url: new FormControl(''),
    stock: new FormControl(''),
    plant_family_id: new FormControl(''),
  });

  
  backendErrors: { [key: string]: string[] } = {};

  constructor(private route: ActivatedRoute, private service: PlantService) {}

  plants: any[] = [];
  uniquePlantFamilies: any[] = [];

  ngOnInit() {
    this.service.getPlants().subscribe(data => {
      this.backendErrors = {};
      this.plants = data as any[];
  
      const familyMap = new Map();
      this.uniquePlantFamilies = this.plants
        .map(p => p.plant_family)
        .filter(family => {
          if (!familyMap.has(family.id)) {
            familyMap.set(family.id, true);
            return true;
          }
          return false;
        });
    });
  }  

  createPlant() {
    const plant = {
      name: this.plantForm.get('name')?.value,
      description: this.plantForm.get('description')?.value,
      price: this.plantForm.get('price')?.value,
      image_url: this.plantForm.get('image_url')?.value,
      stock: this.plantForm.get('stock')?.value,
      plant_family_id: this.plantForm.get('plant_family_id')?.value
    };

    this.service.createPlant(plant).subscribe({
      next: (response) => {
        console.log('Plant saved successfully', response);
        this.backendErrors = {};
      },
      error: (errorResponse) => {
        if (errorResponse.status === 422) {
          this.backendErrors = errorResponse.error.errors;
        } else {
          console.error('Unexpected error:', errorResponse);
        }
      }
    });    
  }

  updatePlant() {
    const plantId = this.route.snapshot.paramMap.get('id');
    if (plantId) {
      const plant = {
        name: this.plantForm.get('name')?.value,
        description: this.plantForm.get('description')?.value,
        price: this.plantForm.get('price')?.value,
        image_url: this.plantForm.get('image_url')?.value
      };

      this.service.updatePlant(plantId, plant).subscribe(response => {
        console.log('Plant updated successfully', response);
      }, error => {
        console.error('Error updating plant', error);
      });
    }
  }

  deletePlant() {
    const plantId = this.route.snapshot.paramMap.get('id');
    if (plantId) {
      this.service.deletePlant(plantId).subscribe(response => {
        console.log('Plant deleted successfully', response);
      }, error => {
        console.error('Error deleting plant', error);
      });
    }
  }

  
} 