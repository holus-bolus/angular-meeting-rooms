import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AssessmentTimePickerComponent } from './assessment-time-picker.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

describe('AssessmentTimePickerComponent', () => {
  let component: AssessmentTimePickerComponent;
  let fixture: ComponentFixture<AssessmentTimePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AssessmentTimePickerComponent],
      imports: [SafeHtmlModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
