import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFoodDrinkComponent } from './show-food-drink.component';

describe('ShowFoodDrinkComponent', () => {
  let component: ShowFoodDrinkComponent;
  let fixture: ComponentFixture<ShowFoodDrinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFoodDrinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFoodDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
