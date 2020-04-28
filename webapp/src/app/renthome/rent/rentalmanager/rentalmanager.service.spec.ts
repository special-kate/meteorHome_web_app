import { TestBed } from '@angular/core/testing';

import { RentalmanagerService } from './rentalmanager.service';

describe('RentalmanagerService', () => {
  let service: RentalmanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalmanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
