import { TestBed } from '@angular/core/testing';

import { FoodDrinkService } from './food-drink.service';

describe('FoodDrinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodDrinkService = TestBed.get(FoodDrinkService);
    expect(service).toBeTruthy();
  });
});
