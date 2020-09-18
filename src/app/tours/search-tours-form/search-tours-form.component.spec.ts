import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchToursFormComponent } from './search-tours-form.component';

describe('SearchToursFormComponent', () => {
  let component: SearchToursFormComponent;
  let fixture: ComponentFixture<SearchToursFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchToursFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchToursFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
