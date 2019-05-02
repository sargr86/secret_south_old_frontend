import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePartnerComponent } from './save-partner.component';

describe('SavePartnerComponent', () => {
  let component: SavePartnerComponent;
  let fixture: ComponentFixture<SavePartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavePartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
