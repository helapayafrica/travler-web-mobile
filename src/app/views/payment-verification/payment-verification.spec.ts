import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentVerification } from './payment-verification';

describe('PaymentVerification', () => {
  let component: PaymentVerification;
  let fixture: ComponentFixture<PaymentVerification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentVerification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentVerification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
