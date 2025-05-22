import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from '../../services/plants/plant.service';
import { RouterModule } from '@angular/router';
import { CancelButtonComponent } from '../../components/buttons/cancel-button/cancel-button.component';

@Component({
  selector: 'app-plant-detail',
  standalone: true,
  imports: [RouterModule, CancelButtonComponent],
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css'] 
})
export class PlantDetailComponent implements OnInit {
  plantID: string | null = null;
  plant: any = null;

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService
  ) {}

  ngOnInit() {
    this.plantID = this.route.snapshot.paramMap.get('id');
    if (this.plantID) {
      this.plantService.getPlant(this.plantID).subscribe(data => {
        this.plant = data;
      });
    }
  }
}

