import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToursComponent } from './add-tours.component';

describe('AddToursComponent', () => {
  let component: AddToursComponent;
  let fixture: ComponentFixture<AddToursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
