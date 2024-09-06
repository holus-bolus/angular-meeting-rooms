import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AssessmentAutocompleteComponent } from './assessment-autocomplete.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

describe('AssesmentAutocompleteComponent', () => {
  let component: AssessmentAutocompleteComponent;
  let fixture: ComponentFixture<AssessmentAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentAutocompleteComponent ],
      imports: [ HttpClientTestingModule, SafeHtmlModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
