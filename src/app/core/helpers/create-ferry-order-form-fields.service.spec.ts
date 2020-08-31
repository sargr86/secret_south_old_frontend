import { TestBed } from '@angular/core/testing';

import { CreateFerryOrderFormFieldsService } from './create-ferry-order-form-fields.service';

describe('CreateFerryOrderFormFieldsService', () => {
  let service: CreateFerryOrderFormFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateFerryOrderFormFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
