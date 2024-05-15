import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalDetailComponent } from './goal-detail.component';

describe('GoalDetailComponent', () => {
  let component: GoalDetailComponent;
  let fixture: ComponentFixture<GoalDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoalDetailComponent]
    });
    fixture = TestBed.createComponent(GoalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
