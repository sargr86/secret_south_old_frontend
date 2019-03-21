import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodDrinkComponent } from './add-food-drink.component';

describe('AddFoodDrinkComponent', () => {
  let component: AddFoodDrinkComponent;
  let fixture: ComponentFixture<AddFoodDrinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFoodDrinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
