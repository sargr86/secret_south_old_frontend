import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveActivityTypeComponent } from './save-activity-type.component';

describe('SaveActivityTypeComponent', () => {
  let component: SaveActivityTypeComponent;
  let fixture: ComponentFixture<SaveActivityTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveActivityTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveActivityTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
