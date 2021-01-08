import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMapRoutesComponent } from './manage-map-routes.component';

describe('ManageMapRoutesComponent', () => {
  let component: ManageMapRoutesComponent;
  let fixture: ComponentFixture<ManageMapRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMapRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMapRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
