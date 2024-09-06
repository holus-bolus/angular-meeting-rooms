import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimePickerComponent } from './time-picker.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AmazingTimePickerModule, AmazingTimePickerService } from 'amazing-time-picker';
import { Observable, of } from 'rxjs';

class AmazingTimePickerServiceMock {
  open(): { afterClose(): Observable<string> } {
    return {
      afterClose(): Observable<string> {
        return of('');
      }
    };
  }
}

describe('TimePickerComponent', () => {
  let component: TimePickerComponent;
  let fixture: ComponentFixture<TimePickerComponent>;
  let amazingTimePickerServiceMock: AmazingTimePickerServiceMock;

  beforeEach(waitForAsync(() => {
    amazingTimePickerServiceMock = new AmazingTimePickerServiceMock();

    TestBed.configureTestingModule({
      imports: [AmazingTimePickerModule],
      declarations: [TimePickerComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AmazingTimePickerService, useValue: amazingTimePickerServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
