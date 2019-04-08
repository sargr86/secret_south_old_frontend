import { TestBed } from '@angular/core/testing';

import { TourTypeService } from './tour-type.service';

describe('TourTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TourTypeService = TestBed.get(TourTypeService);
    expect(service).toBeTruthy();
  });
});
