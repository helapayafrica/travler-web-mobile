import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripFeedbackForm } from './trip-feedback-form';

describe('TripFeedbackForm', () => {
  let component: TripFeedbackForm;
  let fixture: ComponentFixture<TripFeedbackForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripFeedbackForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripFeedbackForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
