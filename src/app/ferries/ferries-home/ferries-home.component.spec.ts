import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FerriesHomeComponent } from './ferries-home.component';

describe('FerriesHomeComponent', () => {
  let component: FerriesHomeComponent;
  let fixture: ComponentFixture<FerriesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FerriesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FerriesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
