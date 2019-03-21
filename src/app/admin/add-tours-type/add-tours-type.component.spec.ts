import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToursTypeComponent } from './add-tours-type.component';

describe('AddToursTypeComponent', () => {
  let component: AddToursTypeComponent;
  let fixture: ComponentFixture<AddToursTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToursTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToursTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
