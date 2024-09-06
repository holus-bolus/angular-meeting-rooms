import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventTimePickerComponent } from './event-time-picker.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EventTimePickerComponent', () => {
  let component: EventTimePickerComponent;
  let fixture: ComponentFixture<EventTimePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTimePickerComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
