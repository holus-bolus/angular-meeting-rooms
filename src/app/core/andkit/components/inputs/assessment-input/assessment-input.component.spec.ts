import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AssessmentInputComponent } from './assessment-input.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

describe('AssessmentInputComponent', () => {
  let component: AssessmentInputComponent;
  let fixture: ComponentFixture<AssessmentInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AssessmentInputComponent],
      imports: [SafeHtmlModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
