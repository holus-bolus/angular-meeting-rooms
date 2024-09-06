import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ApprovedPageComponent } from './approved-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import {TimezoneModule} from '@pipes/timezone/timezone.module';
import {FormCommentModule} from '@andkit/components/other/form-comment/form-comment.module';
import {FormComponentsModule} from '@pages/assessment/form-components/form-components.module';
import {ISalaryReview} from '@interfaces/candidate';
import {DatePickerModule} from '@andkit/components/pickers/date-picker/date-picker.module';

describe('ApprovedPageComponent', () => {
  let component: ApprovedPageComponent;
  let fixture: ComponentFixture<ApprovedPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormCommentModule,
        DatePickerModule,
        FormComponentsModule,
        TimezoneModule,
        BrowserAnimationsModule
      ],
      declarations: [ ApprovedPageComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedPageComponent);
    component = fixture.componentInstance;
    component.candidateDetails = new Observable<ISalaryReview>();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
