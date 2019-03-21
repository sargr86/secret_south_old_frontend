import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFerryComponent } from './all-ferry.component';

describe('AllFerryComponent', () => {
  let component: AllFerryComponent;
  let fixture: ComponentFixture<AllFerryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFerryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFerryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
