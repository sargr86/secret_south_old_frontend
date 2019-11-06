import { TestBed } from '@angular/core/testing';

import { ActivityTypesService } from './activity-types.service';

describe('ActivityTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivityTypesService = TestBed.get(ActivityTypesService);
    expect(service).toBeTruthy();
  });
});
