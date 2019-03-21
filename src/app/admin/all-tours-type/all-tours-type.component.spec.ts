import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllToursTypeComponent } from './all-tours-type.component';

describe('AllToursTypeComponent', () => {
  let component: AllToursTypeComponent;
  let fixture: ComponentFixture<AllToursTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllToursTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllToursTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
