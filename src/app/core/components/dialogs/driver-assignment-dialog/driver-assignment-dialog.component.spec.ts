import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverAssignmentDialogComponent } from './driver-assignment-dialog.component';

describe('DriverAssignmentDialogComponent', () => {
  let component: DriverAssignmentDialogComponent;
  let fixture: ComponentFixture<DriverAssignmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverAssignmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverAssignmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
