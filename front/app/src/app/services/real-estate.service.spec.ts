import { TestBed } from '@angular/core/testing';

import { RealEstateService } from './real-estate.service';

describe('RealEstateService', () => {
  let service: RealEstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealEstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
