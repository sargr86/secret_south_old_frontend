import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckRoutesInfoComponent } from './check-routes-info.component';

describe('CheckRoutesInfoComponent', () => {
  let component: CheckRoutesInfoComponent;
  let fixture: ComponentFixture<CheckRoutesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckRoutesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckRoutesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
