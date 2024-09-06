import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateEventFiltersComponent } from './create-event-filters.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { DatePickerModule } from '@andkit/components/pickers/date-picker/date-picker.module';
import { PortalInputModule } from '@andkit/components/inputs/portal-input/portal-input.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimePickerModule } from '@andkit/components/pickers/time-picker/time-picker.module';
import { ChipsAutocompleteModule } from '@andkit/components/selects/chips-autocomplete/chips-autocomplete.module';

describe('PortalCreateFiltersComponent', () => {
  let component: CreateEventFiltersComponent;
  let fixture: ComponentFixture<CreateEventFiltersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventFiltersComponent ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        PortalInputModule,
        BrowserAnimationsModule,
        DatePickerModule,
        TimePickerModule,
        ChipsAutocompleteModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventFiltersComponent);
    component = fixture.componentInstance;
    component.date = new FormControl('');
    component.signupUrl = new FormControl('');
    component.place = new FormControl('');
    component.hour = new FormControl('');
    component.minute = new FormControl('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
