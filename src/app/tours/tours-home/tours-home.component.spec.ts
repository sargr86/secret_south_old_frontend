import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursHomeComponent } from './tours-home.component';

describe('ToursHomeComponent', () => {
  let component: ToursHomeComponent;
  let fixture: ComponentFixture<ToursHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToursHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToursHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
