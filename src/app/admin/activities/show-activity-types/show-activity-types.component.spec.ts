import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowActivityTypesComponent } from './show-activity-types.component';

describe('ShowActivityTypesComponent', () => {
  let component: ShowActivityTypesComponent;
  let fixture: ComponentFixture<ShowActivityTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowActivityTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowActivityTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
