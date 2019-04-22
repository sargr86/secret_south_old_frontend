import { TestBed } from '@angular/core/testing';

import { OneFoodDrinkResolverService } from './one-food-drink-resolver.service';

describe('OneFoodDrinkResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OneFoodDrinkResolverService = TestBed.get(OneFoodDrinkResolverService);
    expect(service).toBeTruthy();
  });
});
