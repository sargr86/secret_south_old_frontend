import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEditRoutesPricesComponent } from './import-edit-routes-prices.component';

describe('ImportEditRoutesPricesComponent', () => {
  let component: ImportEditRoutesPricesComponent;
  let fixture: ComponentFixture<ImportEditRoutesPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportEditRoutesPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportEditRoutesPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
