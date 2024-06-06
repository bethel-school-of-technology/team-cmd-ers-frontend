import { TestBed } from '@angular/core/testing';

import { GoalInputService } from './goal-input.service';

describe('GoalInputService', () => {
  let service: GoalInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
