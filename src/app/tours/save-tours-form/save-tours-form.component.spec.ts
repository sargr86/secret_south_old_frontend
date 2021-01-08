import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveToursFormComponent } from './save-tours-form.component';

describe('SaveToursFormComponent', () => {
  let component: SaveToursFormComponent;
  let fixture: ComponentFixture<SaveToursFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveToursFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveToursFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
