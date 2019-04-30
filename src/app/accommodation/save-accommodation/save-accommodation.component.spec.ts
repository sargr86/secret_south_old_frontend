import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveAccommodationComponent } from './save-accommodation.component';

describe('SaveAccommodationComponent', () => {
  let component: SaveAccommodationComponent;
  let fixture: ComponentFixture<SaveAccommodationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveAccommodationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
