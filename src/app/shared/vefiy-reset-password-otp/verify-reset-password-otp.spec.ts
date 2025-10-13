import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VefiyResetPasswordOtp } from './vefiy-reset-password-otp';

describe('VefiyResetPasswordOtp', () => {
  let component: VefiyResetPasswordOtp;
  let fixture: ComponentFixture<VefiyResetPasswordOtp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VefiyResetPasswordOtp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VefiyResetPasswordOtp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
