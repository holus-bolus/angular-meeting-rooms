import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CandidateCommonInfoComponent } from './candidate-common-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { ISalaryReview } from '@interfaces/candidate';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

describe('CandidateCommonInfoComponent', () => {
  let component: CandidateCommonInfoComponent;
  let fixture: ComponentFixture<CandidateCommonInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, SafeHtmlModule ],
      declarations: [ CandidateCommonInfoComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCommonInfoComponent);
    component = fixture.componentInstance;
    component.candidateDetails = new Observable<ISalaryReview>();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
