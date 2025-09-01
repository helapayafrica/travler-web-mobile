import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefineFiltersComponent } from './refine-filters.component';

describe('RefineFiltersComponent', () => {
  let component: RefineFiltersComponent;
  let fixture: ComponentFixture<RefineFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefineFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefineFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
