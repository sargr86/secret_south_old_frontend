import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTourTypeComponent } from './save-tour-type.component';

describe('SaveTourTypeComponent', () => {
  let component: SaveTourTypeComponent;
  let fixture: ComponentFixture<SaveTourTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveTourTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTourTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
