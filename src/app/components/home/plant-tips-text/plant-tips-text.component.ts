import { Component } from '@angular/core';
import { PlantTipsButtonComponent } from '../../buttons/plant-tips-button/plant-tips-button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-plant-tips-text',
  imports: [PlantTipsButtonComponent, RouterModule],
  templateUrl: './plant-tips-text.component.html',
  styleUrls: []
})
export class PlantTipsTextComponent {

}
