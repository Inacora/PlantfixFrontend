import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutOfStockButtonComponent } from './out-of-stock-button.component';

describe('OutOfStockButtonComponent', () => {
  let component: OutOfStockButtonComponent;
  let fixture: ComponentFixture<OutOfStockButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutOfStockButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutOfStockButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
