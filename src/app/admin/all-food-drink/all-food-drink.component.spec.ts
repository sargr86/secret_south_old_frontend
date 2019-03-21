import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFoodDrinkComponent } from './all-food-drink.component';

describe('AllFoodDrinkComponent', () => {
  let component: AllFoodDrinkComponent;
  let fixture: ComponentFixture<AllFoodDrinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFoodDrinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFoodDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
