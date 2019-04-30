import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFerryComponent } from './save-ferry.component';

describe('SaveFerryComponent', () => {
  let component: SaveFerryComponent;
  let fixture: ComponentFixture<SaveFerryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveFerryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFerryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
