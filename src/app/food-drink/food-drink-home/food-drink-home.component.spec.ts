import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDrinkHomeComponent } from './food-drink-home.component';

describe('FoodDrinkHomeComponent', () => {
  let component: FoodDrinkHomeComponent;
  let fixture: ComponentFixture<FoodDrinkHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodDrinkHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDrinkHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
