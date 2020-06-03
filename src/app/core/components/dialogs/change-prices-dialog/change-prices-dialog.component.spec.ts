import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePricesDialogComponent } from './change-prices-dialog.component';

describe('ChangePricesDialogComponent', () => {
  let component: ChangePricesDialogComponent;
  let fixture: ComponentFixture<ChangePricesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePricesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePricesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
