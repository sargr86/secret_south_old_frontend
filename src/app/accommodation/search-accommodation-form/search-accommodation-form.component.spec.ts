import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAccommodationFormComponent } from './search-accommodation-form.component';

describe('SearchAccommodationFormComponent', () => {
  let component: SearchAccommodationFormComponent;
  let fixture: ComponentFixture<SearchAccommodationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAccommodationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAccommodationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
