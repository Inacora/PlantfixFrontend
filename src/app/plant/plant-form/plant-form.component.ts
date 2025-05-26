import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantService } from '../../services/plants/plant.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DeleteButtonComponent } from "../../components/buttons/delete-button/delete-button.component";
import { CreateButtonComponent } from "../../components/buttons/create-button/create-button.component";
import { UpdateButtonComponent } from "../../components/buttons/update-button/update-button.component";
import { CancelButtonComponent } from "../../components/buttons/cancel-button/cancel-button.component";

@Component({
  selector: 'app-plant-form',
  imports: [ReactiveFormsModule, RouterModule, DeleteButtonComponent, CreateButtonComponent, UpdateButtonComponent, CancelButtonComponent],
  templateUrl: './plant-form.component.html',
  styleUrls: []
})

export class PlantFormComponent implements OnInit {
  plantForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    image_url: new FormControl(''),
    stock: new FormControl(''),
    plant_family_id: new FormControl(''),
  });

  constructor(private route: ActivatedRoute, private service: PlantService, private router: Router) { }

  plants: any[] = [];
  plantFamilies: any[] = [];
  plantId: string | null = null;
  backendErrors: { [key: string]: string[] } = {};
  isEditMode = false;

 ngOnInit() {
  this.plantId = this.route.snapshot.paramMap.get('id');
  this.isEditMode = !!this.plantId;

 this.service.getPlants().subscribe(response => {
  this.plants = response.data;

  const familyMap = new Map();

  this.plantFamilies = this.plants
    .map(p => p.plant_family)
    .filter(family => {
      if (!familyMap.has(family.id)) {
        familyMap.set(family.id, true);
        return true;
      }
      return false;
    });
});


  if (this.isEditMode && this.plantId) {
    this.service.getPlant(this.plantId).subscribe(plant => {
      this.plantForm.patchValue(plant);
    });
  }
}

  onSubmit() {
    if (this.isEditMode) {
      this.updatePlant();
    } else {
      this.createPlant();
    }
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
        this.router.navigate(['/plants']);
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
    const plant = {
      name: this.plantForm.get('name')?.value,
      description: this.plantForm.get('description')?.value,
      price: this.plantForm.get('price')?.value,
      image_url: this.plantForm.get('image_url')?.value,
      stock: this.plantForm.get('stock')?.value,
      plant_family_id: this.plantForm.get('plant_family_id')?.value
    };

    if (this.plantId) {
      this.service.updatePlant(this.plantId || '', plant).subscribe({
        next: (response) => {
          console.log('Plant updated successfully', response);
          this.backendErrors = {};
          this.router.navigate(['/plants']);
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
  }

  deletePlant() {
    if (!this.plantId) return;

    if (confirm('Are you sure you want to delete this plant?')) {
      this.service.deletePlant(this.plantId).subscribe({
        next: () => {
          this.router.navigate(['/plants']);
        },
        error: (errorResponse) => {
          console.error('Error deleting plant:', errorResponse);
        }
      });
    }
  }
} 