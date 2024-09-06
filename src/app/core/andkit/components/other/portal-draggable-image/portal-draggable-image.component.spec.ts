import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PortalDraggableImageComponent } from './portal-draggable-image.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PortalDraggableImageComponent', () => {
  let component: PortalDraggableImageComponent;
  let fixture: ComponentFixture<PortalDraggableImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalDraggableImageComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalDraggableImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
