import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedToCartButtonComponent } from './added-to-cart-button.component';

describe('AddedToCartButtonComponent', () => {
  let component: AddedToCartButtonComponent;
  let fixture: ComponentFixture<AddedToCartButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddedToCartButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddedToCartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
