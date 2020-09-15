import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFoodDrinkFormComponent } from './search-food-drink-form.component';

describe('SearchFoodDrinkFormComponent', () => {
  let component: SearchFoodDrinkFormComponent;
  let fixture: ComponentFixture<SearchFoodDrinkFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFoodDrinkFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFoodDrinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
