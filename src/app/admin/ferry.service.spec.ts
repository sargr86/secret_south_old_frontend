import { TestBed } from '@angular/core/testing';

import { FerryService } from './ferry.service';

describe('FerryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FerryService = TestBed.get(FerryService);
    expect(service).toBeTruthy();
  });
});
