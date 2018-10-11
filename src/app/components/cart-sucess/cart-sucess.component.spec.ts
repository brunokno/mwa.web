import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSucessComponent } from './cart-sucess.component';

describe('CartSucessComponent', () => {
  let component: CartSucessComponent;
  let fixture: ComponentFixture<CartSucessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartSucessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
