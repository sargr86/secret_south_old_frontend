import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesHomeComponent } from './activities-home.component';

describe('ActivitiesHomeComponent', () => {
  let component: ActivitiesHomeComponent;
  let fixture: ComponentFixture<ActivitiesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
