import { TestBed } from '@angular/core/testing';

import { SellSearchService } from './sell-search.service';

describe('SearchService', () => {
  let service: SellSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
