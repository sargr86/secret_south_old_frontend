import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFerriesComponent } from './show-ferries.component';

describe('ShowFerriesComponent', () => {
  let component: ShowFerriesComponent;
  let fixture: ComponentFixture<ShowFerriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFerriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFerriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
