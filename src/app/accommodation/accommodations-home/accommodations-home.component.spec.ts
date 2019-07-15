import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationsHomeComponent } from './accommodations-home.component';

describe('AccommodationsHomeComponent', () => {
  let component: AccommodationsHomeComponent;
  let fixture: ComponentFixture<AccommodationsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
