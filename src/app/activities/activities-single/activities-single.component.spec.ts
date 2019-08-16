import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesSingleComponent } from './activities-single.component';

describe('ActivitiesSingleComponent', () => {
  let component: ActivitiesSingleComponent;
  let fixture: ComponentFixture<ActivitiesSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
