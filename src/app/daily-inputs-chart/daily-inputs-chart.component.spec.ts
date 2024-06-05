import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyInputsChartComponent } from './daily-inputs-chart.component';

describe('DailyInputsChartComponent', () => {
  let component: DailyInputsChartComponent;
  let fixture: ComponentFixture<DailyInputsChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyInputsChartComponent]
    });
    fixture = TestBed.createComponent(DailyInputsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
