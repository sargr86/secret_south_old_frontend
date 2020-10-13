import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySingleSubtypeComponent } from './activity-single-subtype.component';

describe('ActivitySingleSubtypeComponent', () => {
  let component: ActivitySingleSubtypeComponent;
  let fixture: ComponentFixture<ActivitySingleSubtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitySingleSubtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySingleSubtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
