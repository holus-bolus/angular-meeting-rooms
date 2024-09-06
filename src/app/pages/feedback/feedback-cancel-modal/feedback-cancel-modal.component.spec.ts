import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FeedbackCancelModalComponent } from './feedback-cancel-modal.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { ModalModule } from '@andkit/components/modals/modal/modal.module';
import { ButtonModule } from '@andkit/components/buttons/button/button.module';

describe('FeedbackCancelModalComponent', () => {
  let component: FeedbackCancelModalComponent;
  let fixture: ComponentFixture<FeedbackCancelModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackCancelModalComponent],
      imports: [SafeHtmlModule, ModalModule, ButtonModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackCancelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
