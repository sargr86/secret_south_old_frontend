import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDrinkHeaderComponent } from './food-drink-header.component';

describe('FoodDrinkHeaderComponent', () => {
  let component: FoodDrinkHeaderComponent;
  let fixture: ComponentFixture<FoodDrinkHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodDrinkHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDrinkHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
