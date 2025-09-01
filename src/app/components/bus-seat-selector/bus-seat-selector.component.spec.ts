import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusSeatSelectorComponent } from './bus-seat-selector.component';

describe('BusSeatSelectorComponent', () => {
  let component: BusSeatSelectorComponent;
  let fixture: ComponentFixture<BusSeatSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusSeatSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusSeatSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
