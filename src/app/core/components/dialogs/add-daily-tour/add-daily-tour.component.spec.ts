import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDailyTourComponent } from './add-daily-tour.component';

describe('AddDailyTourComponent', () => {
  let component: AddDailyTourComponent;
  let fixture: ComponentFixture<AddDailyTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDailyTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDailyTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
