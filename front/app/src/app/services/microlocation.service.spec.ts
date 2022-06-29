import { TestBed } from '@angular/core/testing';

import { MicrolocationService } from './microlocation.service';

describe('MicrolocationService', () => {
  let service: MicrolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicrolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
