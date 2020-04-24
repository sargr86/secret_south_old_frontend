import { TestBed } from '@angular/core/testing';

import {FerriesService} from './ferries.service';

describe('FerriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FerriesService = TestBed.get(FerriesService);
    expect(service).toBeTruthy();
  });
});
