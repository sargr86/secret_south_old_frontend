import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FerriesHeaderComponent } from './ferries-header.component';

describe('FerriesHeaderComponent', () => {
  let component: FerriesHeaderComponent;
  let fixture: ComponentFixture<FerriesHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FerriesHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FerriesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
