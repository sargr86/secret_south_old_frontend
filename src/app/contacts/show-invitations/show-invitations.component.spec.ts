import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInvitationsComponent } from './show-invitations.component';

describe('ShowInvitationsComponent', () => {
  let component: ShowInvitationsComponent;
  let fixture: ComponentFixture<ShowInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowInvitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
