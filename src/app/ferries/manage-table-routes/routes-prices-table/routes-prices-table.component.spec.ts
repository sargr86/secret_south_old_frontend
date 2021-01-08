import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesPricesTableComponent } from './routes-prices-table.component';

describe('RoutesPricesTableComponent', () => {
  let component: RoutesPricesTableComponent;
  let fixture: ComponentFixture<RoutesPricesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesPricesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesPricesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
