import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDrinkOrderFormComponent } from './food-drink-order-form.component';

describe('FoodDrinkOrderFormComponent', () => {
  let component: FoodDrinkOrderFormComponent;
  let fixture: ComponentFixture<FoodDrinkOrderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodDrinkOrderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDrinkOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
