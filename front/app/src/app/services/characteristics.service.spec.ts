import { TestBed } from '@angular/core/testing';

import { CharacteristicsService } from './characteristics.service';

describe('CharacteristicsService', () => {
  let service: CharacteristicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacteristicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
