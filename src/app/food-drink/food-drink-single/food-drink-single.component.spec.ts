import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDrinkSingleComponent } from './food-drink-single.component';

describe('FoodDrinkSingleComponent', () => {
  let component: FoodDrinkSingleComponent;
  let fixture: ComponentFixture<FoodDrinkSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodDrinkSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDrinkSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
