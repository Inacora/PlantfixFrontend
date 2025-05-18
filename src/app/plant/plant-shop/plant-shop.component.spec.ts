import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantShopComponent } from './plant-shop.component';

describe('PlantShopComponent', () => {
  let component: PlantShopComponent;
  let fixture: ComponentFixture<PlantShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
