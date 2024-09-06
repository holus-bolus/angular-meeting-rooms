import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AssessmentToastNotificationComponent } from './assessment-toast-notification.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AssessmentToastNotificationComponent', () => {
  let component: AssessmentToastNotificationComponent;
  let fixture: ComponentFixture<AssessmentToastNotificationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentToastNotificationComponent ],
      imports: [ SafeHtmlModule, BrowserAnimationsModule ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentToastNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
