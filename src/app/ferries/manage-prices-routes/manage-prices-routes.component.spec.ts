import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePricesRoutesComponent } from './manage-prices-routes.component';

describe('ManagePricesComponent', () => {
  let component: ManagePricesRoutesComponent;
  let fixture: ComponentFixture<ManagePricesRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePricesRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePricesRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
