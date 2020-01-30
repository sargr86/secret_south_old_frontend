import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRequestBodyComponent } from './show-request-body.component';

describe('ShowRequestBodyComponent', () => {
  let component: ShowRequestBodyComponent;
  let fixture: ComponentFixture<ShowRequestBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRequestBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRequestBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
