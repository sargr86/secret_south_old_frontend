import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveRouteDetailsDialogComponent } from './save-route-details-dialog.component';

describe('SaveRouteDetailsDialogComponent', () => {
  let component: SaveRouteDetailsDialogComponent;
  let fixture: ComponentFixture<SaveRouteDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveRouteDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveRouteDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
