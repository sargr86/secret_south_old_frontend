import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTourFormComponent } from './save-tour-form.component';

describe('SaveTourFormComponent', () => {
  let component: SaveTourFormComponent;
  let fixture: ComponentFixture<SaveTourFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveTourFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTourFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
