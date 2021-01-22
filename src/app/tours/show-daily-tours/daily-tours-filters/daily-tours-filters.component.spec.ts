import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyToursFiltersComponent } from './daily-tours-filters.component';

describe('DailyToursFiltersComponent', () => {
  let component: DailyToursFiltersComponent;
  let fixture: ComponentFixture<DailyToursFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyToursFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyToursFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
