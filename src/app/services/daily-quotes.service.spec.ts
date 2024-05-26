import { TestBed } from '@angular/core/testing';

import { DailyQuotesService } from './daily-quotes.service';

describe('DailyQuotesService', () => {
  let service: DailyQuotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyQuotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
