import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartTryComponent } from './pie-chart-try.component';

describe('PieChartTryComponent', () => {
  let component: PieChartTryComponent;
  let fixture: ComponentFixture<PieChartTryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PieChartTryComponent]
    });
    fixture = TestBed.createComponent(PieChartTryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
