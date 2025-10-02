import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeCalculationComponent } from './scheme-calculation.component';

describe('SchemeCalculationComponent', () => {
  let component: SchemeCalculationComponent;
  let fixture: ComponentFixture<SchemeCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchemeCalculationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemeCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
