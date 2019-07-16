import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationsHeaderComponent } from './accommodations-header.component';

describe('AccommodationsHeaderComponent', () => {
  let component: AccommodationsHeaderComponent;
  let fixture: ComponentFixture<AccommodationsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
