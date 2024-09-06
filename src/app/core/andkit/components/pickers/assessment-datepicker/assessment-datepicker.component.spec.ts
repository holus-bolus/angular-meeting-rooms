import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AssessmentDatepickerComponent } from './assessment-datepicker.component';
import { TruncatePipeModule } from '@pipes/truncate/truncate.pipe.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AssessmentDatepickerComponent', () => {
  let component: AssessmentDatepickerComponent;
  let fixture: ComponentFixture<AssessmentDatepickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentDatepickerComponent ],
      imports: [ TruncatePipeModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
