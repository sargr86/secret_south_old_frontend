import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySubtypesHomeComponent } from './activity-subtypes-home.component';

describe('ActivitySubtypesHomeComponent', () => {
  let component: ActivitySubtypesHomeComponent;
  let fixture: ComponentFixture<ActivitySubtypesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitySubtypesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySubtypesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
