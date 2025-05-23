import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantTipsButtonComponent } from './plant-tips-button.component';

describe('PlantTipsButtonComponent', () => {
  let component: PlantTipsButtonComponent;
  let fixture: ComponentFixture<PlantTipsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantTipsButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantTipsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
