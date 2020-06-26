import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveLocationDialogComponent } from './save-location-dialog.component';

describe('SaveLocationDialogComponent', () => {
  let component: SaveLocationDialogComponent;
  let fixture: ComponentFixture<SaveLocationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveLocationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveLocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
