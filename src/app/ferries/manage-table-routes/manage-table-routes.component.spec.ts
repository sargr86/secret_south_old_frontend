import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTableRoutesComponent } from './manage-table-routes.component';

describe('ManageTableRoutesComponent', () => {
  let component: ManageTableRoutesComponent;
  let fixture: ComponentFixture<ManageTableRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTableRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTableRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
