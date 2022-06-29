import { TestBed } from '@angular/core/testing';

import { MunicipalityService } from './municipality.service';

describe('MunicipalityService', () => {
  let service: MunicipalityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MunicipalityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
