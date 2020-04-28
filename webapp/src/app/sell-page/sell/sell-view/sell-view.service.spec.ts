import { TestBed } from '@angular/core/testing';

import { SellViewService } from './sell-view.service';

describe('SellViewService', () => {
  let service: SellViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
