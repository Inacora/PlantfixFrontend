import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-plant-form',
  imports: [ReactiveFormsModule],
  templateUrl: './plant-form.component.html',
  styleUrl: './plant-form.component.css'
})

export class PlantFormComponent {
  plantForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    image: new FormControl(''),
    stock: new FormControl(''),
  });

  constructor(private route: ActivatedRoute, private service: PlantService) {}

  createPlant() {
    const plant = {
      name: this.plantForm.get('name')?.value,
      description: this.plantForm.get('description')?.value,
      price: this.plantForm.get('price')?.value,
      image: this.plantForm.get('image_url')?.value,
      stock: this.plantForm.get('stock')?.value
    };

    this.service.createPlant(plant).subscribe(response => {
      console.log('Plant saved successfully', response);
    }, error => {
      console.error('Error saving plant', error);
    });
  }

  updatePlant() {
    const plantId = this.route.snapshot.paramMap.get('id');
    if (plantId) {
      const plant = {
        name: this.plantForm.get('name')?.value,
        description: this.plantForm.get('description')?.value,
        price: this.plantForm.get('price')?.value,
        image: this.plantForm.get('image')?.value
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