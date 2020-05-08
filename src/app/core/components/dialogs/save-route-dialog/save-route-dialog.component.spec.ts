import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveRouteDialogComponent } from './save-route-dialog.component';

describe('SaveRouteDialogComponent', () => {
  let component: SaveRouteDialogComponent;
  let fixture: ComponentFixture<SaveRouteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveRouteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveRouteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
