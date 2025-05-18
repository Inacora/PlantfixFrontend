import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantTipsComponent } from './plant-tips.component';

describe('PlantTipsComponent', () => {
  let component: PlantTipsComponent;
  let fixture: ComponentFixture<PlantTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantTipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
