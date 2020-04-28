import { TestBed } from '@angular/core/testing';

import { SearchhomeService } from './searchhome.service';

describe('SearchService', () => {
  let service: SearchhomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchhomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
