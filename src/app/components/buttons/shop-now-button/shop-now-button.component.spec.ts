import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopNowButtonComponent } from './shop-now-button.component';

describe('ShopNowButtonComponent', () => {
  let component: ShopNowButtonComponent;
  let fixture: ComponentFixture<ShopNowButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopNowButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopNowButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
