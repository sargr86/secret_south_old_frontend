import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTourTypesComponent } from './show-tour-types.component';

describe('ShowTourTypesComponent', () => {
  let component: ShowTourTypesComponent;
  let fixture: ComponentFixture<ShowTourTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTourTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTourTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
