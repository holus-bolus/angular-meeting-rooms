import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProgressPageComponent } from './progress-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { ISalaryReview } from '@interfaces/candidate';

describe('InterviewPageComponent', () => {
  let component: ProgressPageComponent;
  let fixture: ComponentFixture<ProgressPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressPageComponent ],
      imports: [ SafeHtmlModule, HttpClientTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressPageComponent);
    component = fixture.componentInstance;
    component.assessments = [];
    component.candidateDetails = new Observable<ISalaryReview>();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
