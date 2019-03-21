import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFerryComponent } from './add-ferry.component';

describe('AddFerryComponent', () => {
  let component: AddFerryComponent;
  let fixture: ComponentFixture<AddFerryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFerryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFerryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
