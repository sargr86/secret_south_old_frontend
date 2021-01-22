import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDailyTourDialogComponent } from './save-daily-tour-dialog.component';

describe('SaveDailyTourDialogComponent', () => {
  let component: SaveDailyTourDialogComponent;
  let fixture: ComponentFixture<SaveDailyTourDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveDailyTourDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveDailyTourDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
