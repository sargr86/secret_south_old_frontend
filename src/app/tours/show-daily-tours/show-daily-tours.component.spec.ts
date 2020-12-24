import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDailyToursComponent } from './show-daily-tours.component';

describe('ShowDailyToursComponent', () => {
  let component: ShowDailyToursComponent;
  let fixture: ComponentFixture<ShowDailyToursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDailyToursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDailyToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
