import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusySpinnerComponent } from './busy-spinner.component';

describe('SpinnerComponent', () => {
  let component: BusySpinnerComponent;
  let fixture: ComponentFixture<BusySpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [BusySpinnerComponent]
});
    fixture = TestBed.createComponent(BusySpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
