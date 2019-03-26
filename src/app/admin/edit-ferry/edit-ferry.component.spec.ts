import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFerryComponent } from './edit-ferry.component';

describe('EditFerryComponent', () => {
  let component: EditFerryComponent;
  let fixture: ComponentFixture<EditFerryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFerryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFerryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
