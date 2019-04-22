import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFoodDrinkComponent } from './save-food-drink.component';

describe('SaveFoodDrinkComponent', () => {
  let component: SaveFoodDrinkComponent;
  let fixture: ComponentFixture<SaveFoodDrinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveFoodDrinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFoodDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
