import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesPageTopComponent } from './routes-page-top.component';

describe('RoutesPageTopComponent', () => {
  let component: RoutesPageTopComponent;
  let fixture: ComponentFixture<RoutesPageTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesPageTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesPageTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
