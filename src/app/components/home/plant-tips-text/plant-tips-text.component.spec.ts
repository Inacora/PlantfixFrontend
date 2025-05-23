import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantTipsTextComponent } from './plant-tips-text.component';

describe('PlantTipsTextComponent', () => {
  let component: PlantTipsTextComponent;
  let fixture: ComponentFixture<PlantTipsTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantTipsTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantTipsTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
