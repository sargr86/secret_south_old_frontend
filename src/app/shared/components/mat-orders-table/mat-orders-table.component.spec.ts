import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatOrdersTableComponent } from './mat-orders-table.component';

describe('MatOrdersTableComponent', () => {
  let component: MatOrdersTableComponent;
  let fixture: ComponentFixture<MatOrdersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatOrdersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
