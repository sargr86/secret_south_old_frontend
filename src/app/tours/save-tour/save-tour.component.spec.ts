import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTourComponent } from './save-tour.component';

describe('SaveTourComponent', () => {
  let component: SaveTourComponent;
  let fixture: ComponentFixture<SaveTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
